import * as React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BlockchainContext } from "./components/BlockchainContext";
import { PoemViewer } from "./components/PoemViewer";
import { Page } from "./Page";
import { NavContext, Pages, TutorialStep } from "./components/NavContext";
import { About } from "./components/About";
import theme from "./components/extendedTheme";

const pageToComponent: Record<Pages, JSX.Element> = {
  [Pages.CurrStatus]: <PoemViewer />,
  [Pages.About]: <About />,
};

export const App = () => {
  const [currPage, setCurrPage] = React.useState<Pages>(Pages.About);
  const [tutorialState, setTutorialState] = React.useState<TutorialStep>(
    TutorialStep.None
  );

  const defaultNavContext = {
    currPage: currPage,
    setCurrPage: setCurrPage,
    tutorialState: tutorialState,
    setTutorialState: setTutorialState,
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <NavContext.Provider value={defaultNavContext}>
          <BlockchainContext
            child={<Page body={pageToComponent[currPage]} />}
          ></BlockchainContext>
        </NavContext.Provider>
      </Box>
    </ChakraProvider>
  );
};
