const express = require("express");
const URL = require("../db/url");
const {nanoid} = require("nanoid");
require('dotenv').config()

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
      }
    );

    const shortURL = `http://localhost:${process.env.PORT}/${shortId}`

    return res.status(201).json({
        msg: 'Short URL generated successfully',
        shortURL: shortURL
    })
  } catch (error) {
    console.log('Error occurred: ', error)
    return res.end('Internal Server Error!')
  }
};

module.exports = {handleGenerateShortURL}
