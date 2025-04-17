#!/bin/sh

# Wait for Directus to be fully initialized
wait_for_directus() {
  echo "======================================"
  echo "WAITING FOR DIRECTUS SERVER TO BE READY"
  echo "======================================"
  
  # Initially wait to give Directus some time to start
  echo "Initial waiting period for Directus startup..."
  sleep 15
  
  MAX_RETRIES=30
  RETRY_COUNT=0
  
  # Try to access the server status endpoint until it responds correctly
  while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    RETRY_COUNT=$((RETRY_COUNT+1))
    echo "Attempt $RETRY_COUNT of $MAX_RETRIES: Testing Directus connection..."
    
    # Use wget instead of curl for better Docker Alpine compatibility
    if wget -q --spider --timeout=5 http://directus:8055/server/ping; then
      echo "SUCCESS! Directus server is up and running!"
      echo "======================================"
      return 0
    else
      echo "Directus is not ready yet - waiting 5 seconds..."
      sleep 5
    fi
  done
  
  echo "ERROR: Maximum retry attempts reached. Could not connect to Directus server."
  return 1
}

# Run the seed script
seed_directus() {
  echo "======================================"
  echo "STARTING DIRECTUS DATABASE SEEDING PROCESS"
  echo "======================================"
  cd /app
  
  # Make sure environment variables are available
  echo "Environment check:"
  echo "DIRECTUS_URL: ${DIRECTUS_URL:-Not set}"
  echo "DIRECTUS_ADMIN_EMAIL: ${DIRECTUS_ADMIN_EMAIL:-Not set}"
  echo "DIRECTUS_ADMIN_PASSWORD: ${DIRECTUS_ADMIN_PASSWORD:+[REDACTED]}"
  
  # Run the TypeScript file directly with ts-node
  echo "Running seed script with ts-node..."
  npx ts-node-esm --project tsconfig.seeder.json ./scripts/seed.ts
  
  SEED_RESULT=$?
  if [ $SEED_RESULT -ne 0 ]; then
    echo "ERROR: Seeding process failed with exit code $SEED_RESULT!"
    return 1
  fi
  
  echo "======================================"
  echo "DIRECTUS SEEDING COMPLETED SUCCESSFULLY"
  echo "======================================"
  return 0
}

# Main execution
if wait_for_directus; then
  if seed_directus; then
    echo "Seeding process completed successfully!"
  else
    echo "Seeding process failed!"
    exit 1
  fi
else
  echo "Failed to connect to Directus server. Seeding process aborted."
  exit 1
fi

# Exit with success code - container will terminate after seeding
exit 0