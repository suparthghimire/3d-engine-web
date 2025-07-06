import { useEffect, useState } from "react";
import AppInfoDialog from "./components/partials/dialogs/app-info.dialog";
import Header from "./components/partials/header/header";
import { useLocalStorage } from "./hooks/use-local-storage";
import { LOCALSTORAGE_KEYS } from "./lib/localStorage.keys";

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
    <main>
      <header className="p-5">
        <Header />
      </header>
      <AppInfoDialog
        showOnStartup={showOnStartup}
        onShowOnStartupChange={handleShowOnStartup}
        open={dialogOpened}
        onOpenChange={handleOpenChange}
      />
    </main>
  );
}

export default App;
