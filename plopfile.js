export default function (plop) {
  plop.setGenerator("component", {
    description: "create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
      {
        type: "confirm",
        name: "createInterface",
        message: "Create an interface?",
      },
      {
        type: "input",
        name: "customPath",
        message: "Add a custom path? Leave blank to 'src/components'",
      },
    ],
    actions: function (data) {
      const basePath = `${
        data.customPath ? data.customPath : "src/components"
      }/{{pascalCase name}}`;

      const templatesPath = "templates/Component";

      let basePathParent = basePath.split("/");
      basePathParent.pop();
      basePathParent = basePathParent.join("/");

      const actions = [
        {
          type: "add",
          path: `${basePath}/index.ts`,
          templateFile: `${templatesPath}/index.hbs`,
        },
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.scss`,
          templateFile: `${templatesPath}/ComponentStyles.hbs`,
        },
      ];

      if (data.createInterface) {
        actions.push({
          type: "add",
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: `${templatesPath}/ComponentWithInterface.hbs`,
        });
      } else {
        actions.push({
          type: "add",
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: `${templatesPath}/ComponentWithoutInterface.hbs`,
        });
      }

      return actions;
    },
  });

  plop.setHelper("pascalCase", function (text) {
    return text
      .replace(/[\W_]+(.)/g, function (match, capture) {
        return capture.toUpperCase();
      })
      .replace(/^[a-z]/, function (match) {
        return match.toUpperCase();
      });
  });
}
