import client from "transloadit";
import dotenv from "dotenv";
dotenv.config();

const Transloadit = new client({
  authKey: process.env.authKey,
  authSecret: process.env.authSecret,
});

console.log(process.env.authKey);
console.log(process.env.authSecret);

(async () => {
  try {
    const options = {
      files: {
        file1: "./images/gardenia.png",
      },
      // params: {
      //   steps: {
      //     // You can have many Steps. In this case we will just resize any inputs (:original)
      //     resize: {
      //       use: ":original",
      //       robot: "/image/resize",
      //       result: true,
      //       width: 200,
      //       height: 200,
      //     },
      //   },
      //   // OR if you already created a template, you can use it instead of "steps":
      //   // template_id: 'YOUR_TEMPLATE_ID',
      // },


      params: {
        template_id: process.env.template_id,
      },
    
    

      waitForCompletion: true, // Wait for the Assembly (job) to finish executing before returning
    };

    const status = await Transloadit.createAssembly(options);

    if (status.results.resize) {
      console.log(
        "✅ Success - Your resized image:",
        status.results.resize[0].ssl_url
      );
    } else {
      console.log(
        "❌ The Assembly didn't produce any output. Make sure you used a valid image file"
      );
    }
  } catch (err) {
    console.error("❌ Unable to process Assembly.", err);
    if (err.assemblyId) {
      console.error(
        `💡 More info: https://transloadit.com/assemblies/${err.assemblyId}`
      );
    }
  }
})();





