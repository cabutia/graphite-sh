'use babel';

import CarbonSh from '../lib/carbon-sh';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CarbonSh', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('carbon-sh');
  });

  describe('when the carbon-sh:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.carbon-sh')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'carbon-sh:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.carbon-sh')).toExist();

        let carbonShElement = workspaceElement.querySelector('.carbon-sh');
        expect(carbonShElement).toExist();

        let carbonShPanel = atom.workspace.panelForItem(carbonShElement);
        expect(carbonShPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'carbon-sh:toggle');
        expect(carbonShPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.carbon-sh')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'carbon-sh:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let carbonShElement = workspaceElement.querySelector('.carbon-sh');
        expect(carbonShElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'carbon-sh:toggle');
        expect(carbonShElement).not.toBeVisible();
      });
    });
  });
});
