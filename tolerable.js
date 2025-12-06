/**
 * Returns a promise that resolves after the element targeted by the selector appears in the DOM.
 *
 * @returns {Promise<HTMLElement>}
 */
function loader(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(_ => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        return resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

loader("div#app-mount").then((_) => {
  console.log("[tolerable] found app element, adding custom css");
  const stylesheet = document.createElement("style");
  stylesheet.innerText = `

  /* Hide Nitro and Shop buttons from the sidebar */
  li[role^="listitem"]:has(div > a[href*="/quest-home"]),
  li[role^="listitem"]:has(div > a[href*="/store"]),
  li[role^="listitem"]:has(div > a[href*="/shop"]) {
    display: none;
  }

  /* Hide animated avatar decorations */
  img[class*="avatarDecoration"], svg[class*="avatarDecoration"] {
    display: none;
  }

  /* Hide animated profile effects */
  div[class*="profileEffects"] {
    display: none !important;
  }

  /* Hide "discover" button and the "download app" button from the sidebar */
  div[class*="listItem"]:has(* > div[data-list-item-id="guildsnav___guild-discover-button"]),
  div[class*="listItem"]:has(* > div[data-list-item-id="guildsnav___app-download-button"]) {
    display: none;
  }

  /* Hide Nitro gift button from chat bar */
  button[aria-label="Send a gift"] {
    display: none;
  }

  /* Hide boost bar from annoying servers */
  li:has(> div[data-list-item-id^="channels___boosts-"]) {
    display: none;
  }

  /* Hide valorant promo */
  .container__686c4 {
    display: none;
  }
`

  document.head.appendChild(stylesheet);
  console.log("[tolerable] css appended");
});
