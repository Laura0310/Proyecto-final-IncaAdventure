const { Router } = require("express");
const cloudinary = require("cloudinary").v2
const router = Router();
const { Images } = require("../db");

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
  secure: true
})

router.get("/", async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinaryConfig.api_secret
  )
  res.json({ timestamp, signature });
});

router.post("/", async (req, res) => {
    try {
      const name = req.body.name
      const fileStr = req.body.data;
      // console.log(fileStr);
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "final_project"
      });
      console.log(uploadResponse);
      if(uploadResponse){
        const newImage = Images.findOrCreate({
          where: {
            name: uploadResponse.asset_id,
            public_id: uploadResponse.public_id,
            url: uploadResponse.secure_url
          }
        })
      }
      res.json({msg: "Image successfully uploaded"})
    } catch (error) {
      console.log(error);
    }

});

module.exports = router;
