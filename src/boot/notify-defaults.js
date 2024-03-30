import { Notify } from "quasar";

const notifErr = (resp) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  // console.log('before utility', resp.response)

  console.log("utility", resp);
  const status =
    resp === "undefined" || resp === undefined ? 500 : resp?.status;
  const statusText =
    resp === "undefined" || resp === undefined ? 500 : resp?.statusText;
  const statusMsg =
    resp === "undefined" || resp === undefined
      ? 500
      : resp?.data
      ? resp?.data?.message
      : "ER";

  // unauthenticated
  if (
    status === 401 ||
    statusText === "Unauthorized" ||
    statusMsg === "Unauthenticated."
  ) {
    console.log("remove token", resp.status);
    return removeToken();
  }

  //   if (status === 200) {

  if (status === 402) {
    console.log("anyar mas", resp);
    storage.setLocalToken(resp.data.token);
    localStorage.setItem("token2", resp.data.token);
    // return next()resp.status
    if (resp.config.url !== "/v1/auth/profile") {
      Notify.create({
        message: "ada kesalahan, harap ulangi",
        icon: "icon-eva-message-circle-outline",
        position: "bottom-right",
        color: "negative",
        actions: [
          {
            label: "Dismiss",
            color: "yellow",
            handler: () => {
              /* console.log('wooow') */
            },
          },
        ],
      });
    }
  } else if (status === 422) {
    const keys = Object.keys(resp.data);
    // const msgs = resp.data.message
    console.log("keys", keys);
    keys.forEach((msgkeys) => {
      if (msgkeys === "errors") {
        const key = Object.keys(resp.data[msgkeys]);
        console.log("key", key);
        key.forEach((msgkey) => {
          resp.data[msgkeys][msgkey].forEach((data) => {
            Notify.create({
              message: data,
              icon: "icon-eva-message-circle-outline",
              position: "top-right",
              color: "negative",
              actions: [
                {
                  label: "Dismiss",
                  color: "yellow",
                  handler: () => {
                    /* console.log('wooow') */
                  },
                },
              ],
              // for (const key in msgs) {
              // }
            });
          });
        });
      } else {
        if (msgkeys !== "nomor") {
          Notify.create({
            message: resp.data[msgkeys],
            icon: "icon-eva-message-circle-outline",
            position: "top-right",
            color: "negative",
            actions: [
              {
                label: "Dismiss",
                color: "yellow",
                handler: () => {
                  /* console.log('wooow') */
                },
              },
            ],
            // for (const key in msgs) {
            // }
          });
        }
      }
    });
  } else if (status === 409) {
    const msgs = resp.data.message;
    Notify.create({
      message: msgs,
      icon: "icon-eva-message-circle-outline",
      position: "top-right",
      color: "negative",
      actions: [
        {
          label: "Dismiss",
          color: "yellow",
          handler: () => {
            /* console.log('wooow') */
          },
        },
      ],
    });
  } else if (status === 417) {
    const keys = Object.keys(resp.data);
    // const msgs = resp.data.message
    console.log("keys", keys);
    keys.forEach((msgkeys) => {
      if (msgkeys === "error") {
        const key = Object.keys(resp.data[msgkeys]);
        console.log("key", key);
        key.forEach((msgkey) => {
          resp.data[msgkeys][msgkey].forEach((data) => {
            Notify.create({
              message: data,
              icon: "icon-eva-message-circle-outline",
              position: "top-right",
              color: "negative",
              actions: [
                {
                  label: "Dismiss",
                  color: "yellow",
                  handler: () => {
                    /* console.log('wooow') */
                  },
                },
              ],
              // for (const key in msgs) {
              // }
            });
          });
        });
      } else {
        if (msgkeys !== "nomor") {
          Notify.create({
            message: resp.data[msgkeys],
            icon: "icon-eva-message-circle-outline",
            position: "top-right",
            color: "negative",
            actions: [
              {
                label: "Dismiss",
                color: "yellow",
                handler: () => {
                  /* console.log('wooow') */
                },
              },
            ],
            // for (const key in msgs) {
            // }
          });
        }
      }
    });
  } else if (status === 500) {
    let msgs = "Ada Kesalahan Harap ulangi";
    if (resp.data) {
      msgs = resp.data.message
        ? resp.data.message
        : "Ada Kesalahan Harap ulangi";
    }
    Notify.create({
      message: msgs,
      icon: "icon-eva-message-circle-outline",
      position: "top-right",
      color: "negative",
      actions: [
        {
          label: "Dismiss",
          color: "yellow",
          handler: () => {
            /* console.log('wooow') */
          },
        },
      ],
    });
  } else {
    const msgs = resp.data
      ? resp.data.message
      : "NETWOR ERROR SERVER TIDAK MERESPON";
    Notify.create({
      message: msgs,
      icon: "eva-message-circle-outline",
      position: "top-right",
      color: "negative",
      actions: [
        {
          label: "Dismiss",
          color: "yellow",
          handler: () => {
            /* console.log('wooow') */
          },
        },
      ],
    });
  }
};

const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : "Sucees!, Wow Kerja Bagus!";
  Notify.create({
    message: msg || "Sucees!, Wow Kerja Bagus!",
    icon: "cloud_done",
    position: "top-right",
    actions: [
      {
        label: "Dismiss",
        color: "yellow",
        handler: () => {
          /* console.log('wooow') */
        },
      },
    ],
  });
};

const notifErrmodip = (resp) => {
  const msg = resp;
  Notify.create({
    message: msg || "Sucees!, Wow Kerja Bagus!",
    icon: "warning",
    position: "top-right",
    color: "negative",
    actions: [
      {
        label: "Dismiss",
        color: "yellow",
        handler: () => {
          /* console.log('wooow') */
        },
      },
    ],
  });
};

export { notifSuccess, notifErr, notifErrmodip };
