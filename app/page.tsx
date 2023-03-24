"use client";
import Image from "next/image";
import { Roboto_Flex } from "next/font/google";
import styles from "./page.module.css";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { OpenAIApi, Configuration } from "openai";
import { Transition } from "@headlessui/react";
const roboto = Roboto_Flex({ subsets: ["latin"] });
function classOrganizer(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}
export default function Home() {
  const textClickBait = (theme: String): string => {
    return `I want you to respond only in language Portuguese
    I'd like you to take on the role of a YouTube video content creator,
    
    1) You need to create the following YouTube video title: Your title should be a brief summary of what your video is about, ideally no more than 60 characters.
    
    2) Use keywords: Use relevant keywords in your title to help people find your video through search.
    
    3) Keep in mind that the video title has to be catchy
    
    4) Make it attention-grabbing: Use action words and phrases that will capture people's attention and make them want to click on your video.
    
    5) Generate 8 best click bate titles
    
   

    Write all output in "Portuguese"
    
    Title: ${theme}
    `;
  };
  const textRoteiro = (theme: String): string => {
    return `If so, ignore the previous guidance. Create an attractive and captivating video script for YouTube. For the subject of the text, make it in the form of a list with 10 topics explaining each one. Make a script that starts in a fun way and that at the beginning has a summary of the main subject of the video. End by thanking you for your attention and asking you to subscribe and give a like.
I want you to answer only in Portuguese.
title: ${theme}
    `;
  };
  const textSEO = (theme: String): string => {
    return `Please ignore all previous instructions. I want you to respond only in Portuguese.  
    I want you to act as a very proficient Professional YouTube SEO Person and high 
    end video SEO optimizer that speaks and writes fluent Portuguese. I want you to pretend that
     you know YouTube SEO very well and your a professional in this work. I want you to  pretend
      that you can write video title and description so good and creative and clickbaity that
       people can't resist to click on video. I want you to pretend you know best possible
       and long Description Format That related to provided Keyword that YouTube will rank it on
        first page . Do not reply that there are many factors that influence good rankings. I know that quality
         of content is just one of them, and it is your task to write the best possible title and description here,
          not to lecture me on general SEO rules. I give you the Title or keyword 
"${theme}" of an video that we need to rank on YouTube first page. I want you to write a 
SEO optimized description that incorporate best possible template that you can think of YouTube Description
 related to the keywords category. Write a long, fully formatted and stylized description in Portuguese 
 that could rank on YouTube on the same keywords as that video. The description should contain rich and 
 informational overview paragraphs about "${theme}" , with lots of details. Its should include 
 a call to action section about liking subscribing and sharing, Additional tags and keywords: add some 
 relevant tags and keywords to the description to improve the visibility of the video in the search results 
 towards the end of description, and Hashtags it the end of description,  Introduction: A brief overview of
  the video's content, including any key takeaways or main points, Video Content: A summary of the key
   points covered in the video, including any key highlights or interesting facts, Social Media Links: Include links to your social
    media accounts, so that viewers can follow you on other platforms but leave the links part for the user to enter use [link here] instead
     of social links url place,   Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. 
     Do not self-reference. Do now use generic filler phrases. Do use  headings with keyword-rich words. Get to
      the point precisely and accurate. Do not explain what and why, just give me your best possible title and description.
 All output shall be in Portuguese and should be in Code box so i can copy it easily. 
    `;
  };
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const [loading, setLoading] = useState(false);
  const openai = new OpenAIApi(configuration);
  const [theme, setTheme] = useState<String>("");
  const [clickBait, setClickBait] = useState<Array<string> | undefined>();
  const [roteiro, setRoteiro] = useState<string>("");
  const [SEO, setSEO] = useState<string>("");
  const generateClickBait = async () => {
    const data = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: textClickBait(theme) }],
    });
    const options = data.data.choices[0].message?.content
      .replaceAll('"', "")
      .replaceAll(/\b[1-8]\)/g, "")
      .split("\n");
    setClickBait(options);
  };
  const generateRoteiro = async () => {
    const data = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: textRoteiro(theme) }],
    });
    const roteiro =
      data.data.choices[0].message?.content == undefined
        ? "Não foi possivel"
        : data.data.choices[0].message?.content;

    setRoteiro(roteiro);
  };
  const generateSEO = async () => {
    const data = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: textSEO(theme) }],
    });
    const SEO =
      data.data.choices[0].message?.content == undefined
        ? "Não foi possivel"
        : data.data.choices[0].message?.content;

    setSEO(SEO);
  };
  const makeAllRequests = async () => {
    setLoading(true);

    await Promise.all([generateClickBait(), generateRoteiro(), generateSEO()]);
    setLoading(false);
  };

  return (
    <main
      style={roboto.style}
      className={classOrganizer("w-full h-screen bg-mainBlack")}
    >
      <div className="w-full mb-4 flex justify-center items-center">
        <div className="gap-3 flex mt-4">
          <input
            onChange={(e) => setTheme(e.target.value)}
            type="text"
            className="rounded-md w-96 form-input outline-none text-gray-700 border-none font-semibold"
            placeholder="Digite seu o tema"
          />
          <button
            onClick={() => makeAllRequests()}
            className={classOrganizer(
              clickBait != undefined && !loading && "bg-green-500",
              "flex px-6 duration-300  py-3 text-mainWhite  font-bold rounded-md bg-mainPurple"
            )}
          >
            {loading ? (
              <ClipLoader size={24} color="#f2f2f2" />
            ) : (
              <span>Gerar</span>
            )}
          </button>
        </div>
      </div>

      {clickBait != undefined && (
        <div className="w-full grid grid-cols-3 gap-2 px-4">
          <div className="bg-gray-700/30 text-center rounded-md text-mainWhite px-6 py-2">
            <h1 className="font-bold">Titulos click bait</h1>
            <div className=" divide-y divide-gray-300 text-md flex flex-col ">
              {clickBait?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="w-full  px-2  py-6 h-16 flex justify-between items-center"
                  >
                    <h1>{value}</h1>
                    <button
                      className="bg-black/70 hover:bg-black/30 px-2 py-2 rounded-md"
                      onClick={() => navigator.clipboard.writeText(value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-700/30 text-center rounded-md text-mainWhite px-6 py-2">
            <h1 className="font-bold">Roteiro</h1>
            <div className=" divide-y divide-gray-300 text-md flex flex-col ">
              <div>
                <button
                  className="bg-black/70 hover:bg-black/30 px-2 py-2 rounded-md"
                  onClick={() => navigator.clipboard.writeText(roteiro)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </button>
              </div>
              <p>{roteiro}</p>
            </div>
          </div>
          <div className="bg-gray-700/30 text-center rounded-md text-mainWhite px-6 py-2">
            <h1 className="font-bold">SEO</h1>
            <div className=" divide-y divide-gray-300 text-md flex flex-col ">
              <div>
                <button
                  className="bg-black/70 hover:bg-black/30 px-2 py-2 rounded-md"
                  onClick={() => navigator.clipboard.writeText(SEO)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </button>
              </div>
              <p>{SEO}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
