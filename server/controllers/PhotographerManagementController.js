const updateAboutService = require('../models/PhotographerManagementModel');

async function updateAbout  (req, res)  {
  const { photographerID, aboutMe } = req.body;

  try {
    await updateAboutService.updateAbout(photographerID, aboutMe);
    res.status(200).json({ message: 'About me updated successfully' });
  } catch (error) {
    console.error('Failed to update about me:', error);
    res.status(500).json({ error: 'Failed to update about me' });
  }
};
module.exports={updateAbout}