import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect();
          } catch (e) {
            console.log(e);
          }
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit',async () => {
            await app.close();
        })
    }
}
