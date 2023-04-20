import { mount, MountOptions, MountReturn } from "cypress/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import "@testing-library/cypress/add-commands";
import { wrapper as Wrapper } from "../../src/mocks/wrapper";
import "./commands";
import "../../src/index.css";
import { worker } from "../../src/mocks/worker";

let isRunning = false;

//cypress/supports/index.js
Cypress.on("test:before:run:async", async () => {
  if (isRunning) {
    console.log("MSW is already running.");
  }

  //if MSW wasnt started by the app, Cypress needs to start it
  if (!isRunning) {
    console.log("MSW has not been started. Starting now.");
    await worker.start();
    isRunning = true;
  }
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps, ...mountOptions } = options;

  const wrapped = (
    <Wrapper
      routerProps={{
        ...routerProps,
        initialEntries: ["/movie/502356?fromPage=nowPlaying"],
      }}
    >
      {component}
    </Wrapper>
  );

  return mount(wrapped, mountOptions);
});
