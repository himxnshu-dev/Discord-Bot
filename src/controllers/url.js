const express = require("express");
const URL = require("../db/url");
const {nanoid} = require("nanoid");

const handleGenerateShortURL = async (req, res) => {
  const {url} = req.body;

  try {
    if (!url)
      return res.json({
        msg: "invalid url!",
      });
    const shortId = nanoid(6);
    await URL.create(
      {
        shortUrl: shortId,
        redirectUrl: url,
      },
      {timestamps: true}
    );

    const shortURL = `http://localhost:`
  } catch (error) {
    return res.send('Error occurred: ', error)
  }
};

module.exports = {handleGenerateShortURL}
