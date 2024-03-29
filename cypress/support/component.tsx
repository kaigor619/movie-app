import React from "react";
import { mount, MountOptions, MountReturn } from "cypress/react";
import { MemoryRouterProps } from "react-router-dom";
import "@testing-library/cypress/add-commands";
import { wrapper as Wrapper } from "../../src/mocks/wrapper";
import "./commands";
import "../../src/index.css";
import { worker } from "../../src/mocks/worker";

let isRunning = false;

//cypress/supports/index.js
Cypress.on("test:before:run:async", async () => {
  if (!isRunning) {
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

  const wrapped = <Wrapper routerProps={routerProps}>{component}</Wrapper>;

  return mount(wrapped, mountOptions);
});
