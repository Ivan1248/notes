{
  const STORAGE_KEY = "reader-mode"
  const urlParams = new URL(window.location.href).searchParams
  const urlMode = urlParams.get("readermode")

  let isReaderMode = true

  // Initialize from localStorage or default
  const savedMode = localStorage.getItem(STORAGE_KEY)
  if (savedMode !== null) {
    isReaderMode = savedMode === "on"
  }

  // Override from URL if present
  if (urlMode === "on") {
    isReaderMode = true
  } else if (urlMode === "off") {
    isReaderMode = false
  }

  const emitReaderModeChangeEvent = (mode: "on" | "off") => {
    const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
      detail: { mode },
    })
    document.dispatchEvent(event)
  }

  document.addEventListener("nav", () => {
    const switchReaderMode = () => {
      isReaderMode = !isReaderMode
      const newMode = isReaderMode ? "on" : "off"
      localStorage.setItem(STORAGE_KEY, newMode)
      document.documentElement.setAttribute("reader-mode", newMode)
      emitReaderModeChangeEvent(newMode)
    }

    for (const readerModeButton of document.getElementsByClassName("readermode")) {
      readerModeButton.addEventListener("click", switchReaderMode)
      window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
    }

    // Set initial state
    document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off")
  })
}
