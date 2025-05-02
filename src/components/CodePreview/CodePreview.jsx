import React from 'react';
import styled from 'styled-components';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCode, FiMonitor, FiCpu } from 'react-icons/fi';

const Container = styled.div`
  background-color: #1e1e1e;
  padding: 24px;
  margin-top: 32px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: white;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CodeBlockWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid #333;
`;

const IframePreview = styled.iframe`
  width: 100%;
  height: 500px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: white;
`;

const SubTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 24px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CodePreview = ({ code, tech }) => {
  let livePreviewHTML = '';
  let reactFiles = {};

  const cleanXPrefix = (content) => content.replace(/^x\s*\n?/gm, '');

  // HTML live preview logic
  if (tech === 'HTML') {
    const cssMatch = code.match(/style\.css:\s*([\s\S]*?)(?=script\.js:|$)/i);
    const jsMatch = code.match(/script\.js:\s*([\s\S]*)$/i);
    const htmlMatch = code.match(/(?:index\.html:)?\s*<!DOCTYPE html>[\s\S]*?<\/html>/i);

    const css = cssMatch ? cleanXPrefix(cssMatch[1].trim()) : '';
    const js = jsMatch ? cleanXPrefix(jsMatch[1].trim()) : '';
    const rawHtml = htmlMatch
      ? cleanXPrefix(htmlMatch[0].replace(/index\.html:\s*/i, '').trim())
      : '';

    const defaultHTML = `
<!DOCTYPE html>
<html>
<head><title>HTML App</title></head>
<body><div id="app"></div></body>
</html>`.trim();

    const baseHTML = rawHtml || defaultHTML;
    const hasHead = baseHTML.includes('</head>');
    const hasBody = baseHTML.includes('</body>');

    if (hasHead && hasBody) {
      livePreviewHTML = baseHTML
        .replace('</head>', `<style>${css}</style>\n</head>`)
        .replace('</body>', `<script>${js}</script>\n</body>`);
    } else {
      livePreviewHTML = `
<!DOCTYPE html>
<html>
<head><title>HTML App</title><style>${css}</style></head>
<body>
  ${baseHTML}
  <script>${js}</script>
</body>
</html>
      `.trim();
    }
  }

  // React live preview logic
  else if (tech === 'React') {
    const blocks = code.split(/---\s(.+?)\s---/g);
    for (let i = 1; i < blocks.length; i += 2) {
      const filename = blocks[i].trim();
      const content = cleanXPrefix(blocks[i + 1].trim());
      const sandpackPath = '/' + filename.replace(/^src\//, '');
      reactFiles[sandpackPath] = { code: content };
    }

    if (!reactFiles['/App.js'] && reactFiles['/App.jsx']) {
      reactFiles['/App.js'] = reactFiles['/App.jsx'];
    }
    if (!reactFiles['/index.js']) {
      reactFiles['/index.js'] = {
        code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
      };
    }
    if (!reactFiles['/index.html']) {
      reactFiles['/index.html'] = {
        code: `<!DOCTYPE html>
<html>
<head><title>React App</title></head>
<body><div id='root'></div></body>
</html>`
      };
    }
  }

  return (
    <Container>
      <SectionTitle><FiCode /> Source Code</SectionTitle>
      <CodeBlockWrapper>
        <SyntaxHighlighter
          language={tech === 'React' ? 'jsx' : 'html'}
          style={vscDarkPlus}
          customStyle={{
            padding: '1rem',
            margin: 0,
            background: '#1e1e1e',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          wrapLongLines
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </CodeBlockWrapper>

      {tech === 'HTML' && (
        <>
          <SubTitle><FiMonitor /> Live Preview</SubTitle>
          <IframePreview title="Live Preview" srcDoc={livePreviewHTML} />
        </>
      )}

      {tech === 'React' && (
        <>
          <SubTitle><FiCpu /> React Live Preview</SubTitle>
          <Sandpack
            template="react"
            files={reactFiles}
            customSetup={{
              dependencies: {
                "react-router-dom": "^6.21.2"
              }
            }}
            options={{
              showTabs: true,
              showConsole: true,
              showLineNumbers: true,
              wrapContent: true,
              height: 500,
            }}
          />
        </>
      )}
    </Container>
  );
};

export default CodePreview;
