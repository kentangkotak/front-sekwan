import print from "vue3-print-nb";
export default async ({ app }) => {
  app.use(print);
};
