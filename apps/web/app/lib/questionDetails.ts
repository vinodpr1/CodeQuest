import fs from "fs";
type languages = "cpp" | "js" | "rs";

interface IQuestion {
  id: string;
  fullBoilerplateCode: string;
  input: string[];
  output: string[];
}

//const MOUNT_PATH =  "../problems/" ?? PAHT to VM machine local file to pick by default

const MOUNT_PATH = "../problems/";

export const getFullQuestionDetails = async (
  questionSlug: string,
  languageId: string,
): Promise<IQuestion> => {
  const input = await getInput(questionSlug);
  const output = await getOutput(questionSlug);
  const fullBoilerplateCode = await getFullBoilerPlateCode(
    questionSlug,
    languageId,
  );

  return {
    id: questionSlug,
    fullBoilerplateCode: fullBoilerplateCode,
    input: input,
    output: output,
  };
};

async function getFullBoilerPlateCode(
  questionSlug: string,
  languageId: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      `${MOUNT_PATH}/${questionSlug}/fullboilerplate/function.${languageId}`,
      "utf-8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}

async function getInput(questionSlug: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${questionSlug}/tests/input`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${questionSlug}/tests/input/${file}`,
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(data);
                    }
                  },
                );
              });
            }),
          )
            .then((data) => {
              resolve(data);
            })
            .catch((err) => reject(err));
        }
      },
    );
  });
}

async function getOutput(questionSlug: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${questionSlug}/tests/output`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${questionSlug}/tests/output/${file}`,
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(data);
                    }
                  },
                );
              });
            }),
          )
            .then((data) => {
              resolve(data);
            })
            .catch((err) => reject(err));
        }
      },
    );
  });
}
