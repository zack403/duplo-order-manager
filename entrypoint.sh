#!/bin/sh  

# Apply Prisma migrations and start the application  
npx prisma generate --schema=/usr/src/app/src/database/schema.prisma  

# Run database migrations  
npx prisma migrate dev --name init --schema=/usr/src/app/src/database/schema.prisma

npx prisma migrate deploy --schema=/usr/src/app/src/database/schema.prisma
  
npx prisma db seed

# Run the main container command  
exec "$@"