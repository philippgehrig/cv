import 'dotenv/config';
// Import SDK with more detailed exports
import { 
  createDirectus, 
  rest, 
  createItem, 
  createCollection, 
  readItems, 
  staticToken,
  authentication
} from '@directus/sdk';
import type { Schema } from '../composables/directus/client.js';

// Debug helper for better error logging
const logError = async (error: unknown, context: string): Promise<void> => {
  console.error(`ERROR in ${context}:`);

  if (error instanceof Error) {
    console.error(`- Message: ${error.message}`);
  } else {
    console.error(`- Message: Unknown error`);
  }

  // Log more detailed information about the error if it's a Response object
  if (error instanceof Response) {
    console.error(`- Status: ${error.status}`);
    console.error(`- Status Text: ${error.statusText}`);
    try {
      const data = await error.json();
      console.error(`- Response data:`, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`- Could not parse response body as JSON`);
    }
  }

  // Try to log any available body if error is a custom error with body property
  try {
    // Type guard for custom error type with `body` field
    if (typeof error === 'object' && error !== null && 'body' in error) {
      const body = (error as any).body;
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;
      console.error(`- Error body:`, JSON.stringify(parsed, null, 2));
    }
  } catch (e) {
    console.error(`- Could not parse error body`);
  }

  // Always log the stack trace
  if (error instanceof Error && error.stack) {
    console.error(`- Stack: ${error.stack}`);
  }
};


// Using a self-executing async function
const seed = async () => {
  console.log('=========================================');
  console.log('STARTING DIRECTUS DATABASE SEEDING PROCESS');
  console.log('=========================================');
  console.log(`Timestamp: ${new Date().toISOString()}`);

  // Create a dedicated client for seeding that uses proper authentication
  const directusUrl = process.env.DIRECTUS_URL ?? 'http://localhost:8055';
  console.log(`Connecting to Directus at: ${directusUrl}`);
  
  // Test connection to Directus
  try {
    const response = await fetch(`${directusUrl}/server/ping`);
    console.log(`Server ping status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`Failed to connect to Directus server: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    logError(error, 'Connection Test');
    process.exit(1);
  }
  
  // Create the Directus client with rest transport
  const client = createDirectus<Schema>(directusUrl).with(rest());
  
  // Login with admin credentials
  try {
    console.log('Attempting to authenticate with admin credentials...');
    const adminEmail = process.env.DIRECTUS_ADMIN_EMAIL;
    const adminPassword = process.env.DIRECTUS_ADMIN_PASSWORD;
    
    console.log(`Admin email: ${adminEmail}`);
    console.log(`Admin password: ${adminPassword ? '[REDACTED]' : 'MISSING'}`);
    
    if (!adminEmail || !adminPassword) {
      throw new Error('Missing admin credentials. Please set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD environment variables.');
    }
    
    // Setup authentication
    const authClient = client.with(authentication('json'));
    
    // Login with credentials and get the authenticated client
    console.log('Attempting to login...');
    const authResponse = await authClient.login(adminEmail, adminPassword);
    console.log('Authentication successful!');
    console.log('Auth token received:', authResponse.access_token ? 'Yes' : 'No');
    
    // Get the auth token and create a new client with static token
    const authToken = authResponse.access_token;

    if (!authToken) {
      throw new Error('Failed to retrieve authentication token.');
    }
    const authenticatedClient = createDirectus<Schema>(directusUrl)
      .with(rest())
      .with(staticToken(authToken));
    
if (!authToken) {
      throw new Error('Failed to retrieve authentication token.');
    }

    if (!authToken) {
      throw new Error('Failed to retrieve authentication token.');
    }

    // Test the authenticated client with a simple request
    try {
      console.log('Testing authenticated client...');
      const serverInfo = await fetch(`${directusUrl}/server/info`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log(`Server info request status: ${serverInfo.status} ${serverInfo.statusText}`);
    } catch (error) {
      console.error('Error testing authenticated client:');
      logError(error, 'Auth Test');
    }
    
    // Check if data already exists before seeding
    async function checkDataExists() {
      try {
        // Check for existing profile data (singleton)
        const existingProfile = await authenticatedClient.request(readItems('profile', { limit: 1 }));
        if (existingProfile && Array.isArray(existingProfile) && existingProfile.length > 0) {
          console.log('Profile already exists, skipping profile creation');
          return true;
        }
        
        // Check for existing experiences
        const existingExperiences = await authenticatedClient.request(readItems('experiences', { limit: 1 }));
        if (existingExperiences && Array.isArray(existingExperiences) && existingExperiences.length > 0) {
          console.log('Experiences already exist, skipping experiences creation');
          return true;
        }
        
        // Check for existing education
        const existingEducation = await authenticatedClient.request(readItems('education', { limit: 1 }));
        if (existingEducation && Array.isArray(existingEducation) && existingEducation.length > 0) {
          console.log('Education already exists, skipping education creation');
          return true;
        }
        
        // Check for existing skill categories
        const existingCategories = await authenticatedClient.request(readItems('skill_categories', { limit: 1 }));
        if (existingCategories && Array.isArray(existingCategories) && existingCategories.length > 0) {
          console.log('Skill categories already exist, skipping skill categories creation');
          return true;
        }
        
        // No existing data found
        return false;
      } catch (error) {
        // If collections don't exist yet, this will throw an error, which is fine
        console.log('No existing data found or collections do not exist yet. Proceeding with seeding.');
        return false;
      }
    }
    
    // Check if data exists before proceeding
    const dataExists = await checkDataExists();
    if (dataExists) {
      console.log('Data already exists in Directus. Skipping the data seeding process.');
      console.log('If you want to recreate the data, please delete the existing entries first.');
      return;
    }
    
    // Continue with the existing seed logic to create collections
    try {
      // First, create the collections if they don't exist
      console.log('Creating collections...');
      
      // Define collections
      const collections = [
        {
          collection: 'profile',
          meta: {
            icon: 'person',
            note: 'Personal profile information',
            display_template: '{{name}} - {{title}}',
            singleton: true
          },
          schema: {
            name: 'profile'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'title',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'bio',
              type: 'text',
              meta: {
                interface: 'input-multiline',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'profile_image',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'linkedin',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'github',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'twitter',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        },
        {
          collection: 'experiences',
          meta: {
            icon: 'work',
            note: 'Professional experiences',
            display_template: '{{company}} - {{position}}'
          },
          schema: {
            name: 'experiences'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'company',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'position',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'period',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'description',
              type: 'text',
              meta: {
                interface: 'input-multiline',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'technologies',
              type: 'json',
              meta: {
                interface: 'list',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'sort',
              type: 'integer',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'roles',
              type: 'json',
              meta: {
                interface: 'list',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        },
        {
          collection: 'education',
          meta: {
            icon: 'school',
            note: 'Educational background',
            display_template: '{{degree}} - {{institution}}'
          },
          schema: {
            name: 'education'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'degree',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'institution',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'period',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'description',
              type: 'text',
              meta: {
                interface: 'input-multiline',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'sort',
              type: 'integer',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        },
        {
          collection: 'skill_categories',
          meta: {
            icon: 'category',
            note: 'Skill categories',
            display_template: '{{name}}'
          },
          schema: {
            name: 'skill_categories'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'sort',
              type: 'integer',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        },
        {
          collection: 'skills',
          meta: {
            icon: 'build',
            note: 'Skills',
            display_template: '{{name}} - {{level}}'
          },
          schema: {
            name: 'skills'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'name',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'level',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'category',
              type: 'integer',
              meta: {
                interface: 'select-dropdown-m2o',
                required: false,
                special: ['m2o']
              },
              schema: {
                is_nullable: true,
                foreign_key_table: 'skill_categories',
                foreign_key_column: 'id'
              }
            },
            {
              field: 'sort',
              type: 'integer',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        },
        {
          collection: 'contact',
          meta: {
            icon: 'mail',
            note: 'Contact information',
            display_template: '{{label}} - {{value}}'
          },
          schema: {
            name: 'contact'
          },
          fields: [
            {
              field: 'id',
              type: 'integer',
              meta: {
                hidden: true,
                interface: 'input',
                readonly: true
              },
              schema: {
                is_primary_key: true,
                has_auto_increment: true
              }
            },
            {
              field: 'label',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'value',
              type: 'string',
              meta: {
                interface: 'input',
                required: true
              },
              schema: {
                is_nullable: false
              }
            },
            {
              field: 'icon',
              type: 'string',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            },
            {
              field: 'sort',
              type: 'integer',
              meta: {
                interface: 'input',
                required: false
              },
              schema: {
                is_nullable: true
              }
            }
          ]
        }
      ];

      // Create each collection
      for (const collection of collections) {
        try {
          await authenticatedClient.request(createCollection(collection));
          console.log(`Collection "${collection.collection}" created`);
        } catch (error) {
          console.log(`Collection "${collection.collection}" already exists or error:`, error instanceof Error ? error.message : 'Unknown error');
        }
      }

      // After creating collections, continue with seeding data
      console.log('Seeding data...');

      // Profile
      try {
        console.log('Creating profile...');
        // Check if profile already exists before creating
        try {
          const existingProfiles = await authenticatedClient.request(readItems('profile', { limit: 1 }));
          if (existingProfiles && Array.isArray(existingProfiles) && existingProfiles.length > 0) {
            console.log('Profile already exists, skipping creation');
          } else {
            const profileData = {
              name: 'Philipp Gehrig',
              title: 'Software Engineer',
              bio: 'A passionate software engineer with expertise in embedded systems, C/C++, and web development.',
              profile_image: '/images/Philipp-Gehrig_2025.png',
              linkedin: 'https://linkedin.com/in/philippgehrig',
              github: 'https://github.com/philippgehrig'
            };
            await authenticatedClient.request(createItem('profile', profileData));
            console.log('Profile created successfully');
          }
        } catch (error) {
          if ((error instanceof Error && error.message.includes('Not Found')) || (error as any)?.response?.status === 404) {
            // Collection might not exist yet, continue with creation
            const profileData = {
              name: 'Philipp Gehrig',
              title: 'Software Engineer',
              bio: 'A passionate software engineer with expertise in embedded systems, C/C++, and web development.',
              profile_image: '/images/Philipp-Gehrig_2025.png',
              linkedin: 'https://linkedin.com/in/philippgehrig',
              github: 'https://github.com/philippgehrig'
            };
            await authenticatedClient.request(createItem('profile', profileData));
            console.log('Profile created successfully');
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error('Error creating profile:');
        logError(error, 'Create Profile');
      }

      // Experiences
      try {
        console.log('Creating experiences...');
        // Check if experiences already exist
        const existingExperiences = await authenticatedClient.request(readItems('experiences', { limit: 1 }));
        if (existingExperiences && Array.isArray(existingExperiences) && existingExperiences.length > 0) {
          console.log('Experiences already exist, skipping creation');
        } else {
          const experiencesData = [
            {
              company: 'Mercedes Benz',
              position: 'Software Engineer',
              period: '2022 - 2025',
              description: 'Worked on various automotive software projects including embedded systems and ECU testing.',
              technologies: ['Software Development', 'Embedded Systems', 'C/C++', 'Automotive Systems', 'Data Analysis'],
              roles: JSON.stringify([
                {
                  title: 'Software Development for ECU Testing',
                  period: 'Jan 2024 - Apr 2025',
                  description: 'Developed software tools for automated testing of electronic control units (ECUs) in advanced driver assistance systems.',
                  technologies: ['C++', 'Python', 'Automotive Systems', 'ECU Testing', 'ADAS']
                },
                {
                  title: 'Data Analysis for Vehicle Dynamics',
                  period: 'May 2023 - Dec 2023',
                  description: 'Analyzed and visualized vehicle dynamics data to improve simulation models for autonomous driving scenarios.',
                  technologies: ['Data Analysis', 'Python', 'MATLAB', 'Vehicle Dynamics', 'Autonomous Driving']
                },
                {
                  title: 'Embedded Systems Programming',
                  period: 'Sep 2022 - Apr 2023',
                  description: 'Implemented embedded systems solutions for automotive applications, focusing on real-time performance and reliability.',
                  technologies: ['Embedded Systems', 'C', 'Real-time Systems', 'Automotive Architecture']
                }
              ])
            },
            {
              company: 'DHBW Engineering',
              position: 'Lead CFD Engineer',
              period: '2023 - 2025',
              description: 'Led a team focused on Computational Fluid Dynamics (CFD) simulations, overseeing project planning, task delegation, and technical implementation of simulation models.',
              technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'IT Infrastructure', 'Data Analysis'],
              roles: JSON.stringify([])
            }
          ];
          
          for (const exp of experiencesData) {
            await authenticatedClient.request(createItem('experiences', {
              ...exp,
              roles: JSON.parse(exp.roles)
            }));
            console.log(`Experience for ${exp.company} created`);
          }
          console.log('All experiences created successfully');
        }
      } catch (error) {
        console.error('Error creating experiences:');
        logError(error, 'Create Experiences');
      }

      // Education - Add similar check for existing data
      try {
        console.log('Creating education...');
        const existingEducation = await authenticatedClient.request(readItems('education', { limit: 1 }));
        if (existingEducation && Array.isArray(existingEducation) && existingEducation.length > 0) {
          console.log('Education already exists, skipping creation');
        } else {
          const educationData = [
            {
              degree: 'Bachelor of Science in Computer Science',
              institution: 'DHBW (Baden-Württemberg Cooperative State University)',
              period: '2022 - 2025',
              description: 'Dual study program in cooperation with Mercedes Benz, combining academic studies with practical industry experience in automotive software engineering.'
            }
          ];
          
          for (const ed of educationData) {
            await authenticatedClient.request(createItem('education', ed));
            console.log(`Education ${ed.degree} created`);
          }
          console.log('All education created successfully');
        }
      } catch (error) {
        console.error('Error creating education:');
        logError(error, 'Create Education');
      }

      // Skill Categories & Skills - Add check for existing data
      try {
        console.log('Creating skill categories and skills...');
        const existingCategories = await authenticatedClient.request(readItems('skill_categories', { limit: 1 }));
        if (existingCategories && Array.isArray(existingCategories) && existingCategories.length > 0) {
          console.log('Skill categories already exist, skipping creation');
        } else {
          const categoriesData = [
            { name: 'Software Development', sort: 1, skills: [
                { name: 'C/C++', level: 'Advanced' },
                { name: 'Embedded Systems Programming', level: 'Advanced' },
                { name: 'Data Analysis', level: 'Intermediate' }
              ]
            },
            { name: 'Engineering & Simulation', sort: 2, skills: [
                { name: 'CFD (Computational Fluid Dynamics)', level: 'Advanced' },
                { name: 'Simulation Modeling', level: 'Advanced' }
              ]
            },
            { name: 'Automotive Technology', sort: 3, skills: [
                { name: 'Advanced Driver Assistance Systems', level: 'Intermediate' },
                { name: 'Automotive ECU Architecture', level: 'Advanced' },
                { name: 'Embedded Systems', level: 'Advanced' }
              ]
            },
            { name: 'Leadership & Management', sort: 4, skills: [
                { name: 'Team Leadership', level: 'Advanced' },
                { name: 'Project Management', level: 'Intermediate' }
              ]
            },
            { name: 'Languages', sort: 5, skills: [
                { name: 'German', level: 'Native' },
                { name: 'English', level: 'Native' }
              ]
            },
            { name: 'Web Development', sort: 6, skills: [
                { name: 'Vue.js', level: 'Intermediate' },
                { name: 'Laravel', level: 'Intermediate' },
                { name: 'Tailwind CSS', level: 'Intermediate' }
              ]
            }
          ];
          
          const categoryMap: Record<string, number> = {};
          for (const cat of categoriesData) {
            console.log(`Creating category: ${cat.name}`);
            const createdCat = await authenticatedClient.request(createItem('skill_categories', { name: cat.name, sort: cat.sort }));
            // Ensure we have an id
            if (!createdCat || typeof createdCat !== 'object' || !('id' in createdCat)) {
              console.error(`Failed to get ID from created category ${cat.name}`);
              console.log('Response:', JSON.stringify(createdCat, null, 2));
              continue;
            }
            
            categoryMap[cat.name] = createdCat.id;
            console.log(`Category ${cat.name} created with ID ${createdCat.id}`);
            
            for (const skill of cat.skills) {
              console.log(`Creating skill: ${skill.name} under ${cat.name}`);
              await authenticatedClient.request(createItem('skills', { 
                name: skill.name, 
                level: skill.level, 
                category: categoryMap[cat.name], 
                sort: 0 
              }));
              console.log(`Skill ${skill.name} created under category ${cat.name}`);
            }
          }
          console.log('All skills and categories created successfully');
        }
      } catch (error) {
        console.error('Error creating skills:');
        logError(error, 'Create Skills');
      }

      // Contact Info - Add check for existing data
      try {
        console.log('Creating contact info...');
        const existingContacts = await authenticatedClient.request(readItems('contact', { limit: 1 }));
        if (existingContacts && Array.isArray(existingContacts) && existingContacts.length > 0) {
          console.log('Contact info already exists, skipping creation');
        } else {
          const contactData = [
            { label: 'Email', value: 'philipp@gehrig.info', icon: '📧', sort: 1 },
            { label: 'Phone', value: '+49 151 68195162', icon: '📱', sort: 2 },
            { label: 'Location', value: 'Germany', icon: '📍', sort: 3 }
          ];
          
          for (const contact of contactData) {
            await authenticatedClient.request(createItem('contact', contact));
            console.log(`Contact ${contact.label} created`);
          }
          console.log('All contact info created successfully');
        }
      } catch (error) {
        console.error('Error creating contact info:');
        logError(error, 'Create Contact');
      }

      console.log('Seeding process completed successfully!');
    } catch (error) {
      console.error('Error during seeding process:');
      logError(error, 'Seeding');
      throw error;
    }
  } catch (loginError) {
    console.error('Authentication failed:');
    logError(loginError, 'Authentication');
    process.exit(1);
  }
};

// Execute the seed function
seed().catch(error => {
  console.error('Unhandled error in seed script:');
  if (typeof error === 'object' && error !== null) {
    console.error(JSON.stringify(error, null, 2));
  } else {
    console.error(error);
  }
  process.exit(1);
});