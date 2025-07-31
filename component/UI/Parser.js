import React from 'react'
import parse, { domToReact } from 'html-react-parser';
export default function Parser(content) {
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
      if (!content || typeof content !== 'string') {
        return null; // or some fallback UI
      }
  return (
    <>
      {parse(content, options)}
    </>
  )
}
