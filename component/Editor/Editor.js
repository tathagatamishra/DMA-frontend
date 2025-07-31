// components/JoditEditor.jsx
"use client";
import React, { useState, useRef } from 'react';
import { Component } from "react";
import Slider from "react-slick";
import dynamic from 'next/dynamic';
import parse, { domToReact } from 'html-react-parser';
import DOMPurify from 'dompurify';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const options = {
    replace: (domNode) => {
      if (domNode.name === 'table') {
        return (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse border border-gray-300">
              {domToReact(domNode.children, options)}
            </table>
          </div>
        );
      }
      if (domNode.name === 'td' || domNode.name === 'th') {
        return (
          <td className="border border-gray-300 p-2">
            {domToReact(domNode.children, options)}
          </td>
        );
      }
      if (domNode.name === 'tr') {
        return (
          <tr className="hover:bg-gray-50">
            {domToReact(domNode.children, options)}
          </tr>
        );
      }
    }
  };

  // Enhanced update handler
  const handleUpdate = (newContent) => {
    const sanitizedContent = DOMPurify.sanitize(newContent);
    setContent(sanitizedContent);
  };

  // Enhanced onBlur handler
  const handleBlur = (newContent) => {
    console.log('Editor blur, content:', newContent);
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };

  return (
    <>
  
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Editor</h2>
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            onChange={handleUpdate}
            onBlur={handleBlur}
            tabIndex={1}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="prose max-w-none">
            {parse(content, options)}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Editor;