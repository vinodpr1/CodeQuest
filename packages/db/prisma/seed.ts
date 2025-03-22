import { LANGUAGES } from "@repo/common/language";
import { prisma } from "../src/index";

(async () =>
  await prisma.language.createMany({
    data: LANGUAGES.map((lang) => {
      return {
        id: lang.id,
        name: lang.monaco,
        judge0Id: lang.judge0Id,
        extension: lang.extension,
      };
    }),
  }))();
