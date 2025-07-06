import { useEffect, useState } from "react";
import AppInfoDialog from "./components/partials/dialogs/app-info.dialog";
import Header from "./components/partials/header/header";
import { useLocalStorage } from "./hooks/use-local-storage";
import { LOCALSTORAGE_KEYS } from "./lib/localStorage.keys";
import Scene from "./components/scene";
import SidePanel from "./components/partials/side-panel";

function App() {
  const { getItem, setItem } = useLocalStorage();
  const storedDialogOpen = getItem<boolean>(
    LOCALSTORAGE_KEYS.app_info_dialog_startup,
    false
  );

  const [dialogOpened, setDialogOpened] = useState(false);
  const [showOnStartup, setShowOnStartup] = useState(false);

  useEffect(() => {
    setDialogOpened(storedDialogOpen);
    setShowOnStartup(storedDialogOpen);
  }, [storedDialogOpen]);

  function handleOpenChange(v: boolean) {
    setDialogOpened(v);
  }

  function handleShowOnStartup(v: boolean) {
    setShowOnStartup(v);
    setItem({
      key: LOCALSTORAGE_KEYS.app_info_dialog_startup,
      value: JSON.stringify(v),
    });
  }

  return (
    <main className="h-screen relative">
      <header className="absolute top-5 left-5 z-20">
        <Header />
      </header>
      <div className="absolute z-20 w-fit top-20 left-5">
        <SidePanel />
      </div>
      <AppInfoDialog
        showOnStartup={showOnStartup}
        onShowOnStartupChange={handleShowOnStartup}
        open={dialogOpened}
        onOpenChange={handleOpenChange}
      />
      <Scene />
    </main>
  );
}

export default App;
