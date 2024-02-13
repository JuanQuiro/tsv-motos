import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const defaultLayoutPluginInstance = defaultLayoutPlugin();

const HomePage = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
      <Worker workerUrl="/terminos.pdf">
          <div
              style={{
                  height: '750px',
                  width: '900px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
              }}
          >
              <Viewer fileUrl="/pdf-open-parameters.pdf" plugins={[defaultLayoutPluginInstance]} />
          </div>
      </Worker>
  );
};