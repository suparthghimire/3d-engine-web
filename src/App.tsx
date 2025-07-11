import { useEffect, useState } from "react";
import AppInfoDialog from "./components/partials/dialogs/app-info.dialog";
import Header from "./components/partials/header/header";
import { useLocalStorage } from "./hooks/use-local-storage";
import { LOCALSTORAGE_KEYS } from "./lib/localStorage.keys";
import Scene from "./components/scene";
import SidePanel from "./components/partials/side-panel";
import { useSceneStore } from "./store/scene.store";

function App() {
  const { getItem, setItem } = useLocalStorage();
  const storedDialogOpen = getItem<boolean>(
    LOCALSTORAGE_KEYS.app_info_dialog_startup,
    true
  );

  const selectedMesh = useSceneStore(
    (state) => state.meshes.find((m) => m.id === state.selectedMeshId) || null
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
      <SidePanel open={!!selectedMesh} />
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
