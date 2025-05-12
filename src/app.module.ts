import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ListModule } from "./list/list.module";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ListModule, TaskModule],
})
export class AppModule {}
