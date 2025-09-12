const express = require("express");
const URL = require("../db/url");
const {nanoid} = require("nanoid");
require("dotenv").config();

const handleGenerateShortURL = async (req, res) => {
  const {url} = req.body;

  try {
    if (!url)
      return res.json({
        msg: "invalid url!",
      });
    const shortId = nanoid(6);
    await URL.create({
      shortUrl: shortId,
      redirectUrl: url,
    });

    const shortURL = `http://localhost:${process.env.PORT}/api/${shortId}`;

    return res.status(201).json({
      msg: "Short URL generated successfully",
      shortURL: shortURL,
    });
  } catch (error) {
    console.log("Error occurred: ", error);
    return res.end("Internal Server Error!");
  }
};

const handleGetFromShortURL = async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    console.log("No such short URL exists on the paramaters");
    return res.end("Internal server Error!");
  }

  try {
    const url = await URL.findOne({
      shortUrl: shortId,
    });

    if (!url) {
        throw new Error('NO such URL exists on the DB')
    }

    return res.redirect(url.redirectUrl)
  } catch (error) {
    console.log('Error occurred:', error)
    return res.json({
        msg: 'Internal server error'
    })
  }
};

module.exports = {handleGenerateShortURL, handleGetFromShortURL};
