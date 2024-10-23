(function(){

  console.info(
    'welcome to WebViso/yestool，author：YesTool，author url: https://webviso.yestool.org'
  );

  setTimeout(function () {
    var addHeadStr = '<meta property="og:site_counter_author" content="yestool"></meta>'
      + '<meta property="og:site_counter_author_url" content="https://webviso.yestool.org"></meta>';
    
    if (document.head){
      document.head.innerHTML += addHeadStr;
    }
  }, 500);

  const script = document.currentScript;
  let dataBaseUrl = script.getAttribute('data-base-url');
  let dataPagePvId = script.getAttribute('data-page-pv-id');
  let dataPageUvId = script.getAttribute('data-page-uv-id');

  const WebViso = {};
  WebViso.version = '0.0.0';
  let BASE_API_PATH = 'https://webviso.yestool.org';

  WebViso.page_pv_id = "page_pv"; 
  WebViso.page_uv_id = "page_uv";
  if(dataBaseUrl) {
    BASE_API_PATH = dataBaseUrl;
  }
  if(dataPagePvId) {
    WebViso.page_pv_id = dataPagePvId;
  }
  if(dataPageUvId) {
    WebViso.page_uv_id = dataPageUvId;
  }

  /**
   * @description: init Fetch json from api
   * @return {Object}
   */
  WebViso.init = async function () {
    const thisPage = getLocation(window.location.href);
    const pagePvEle = document.getElementById(WebViso.page_pv_id);
    const pageUvEle = document.getElementById(WebViso.page_uv_id);
    const queryData = {
      url: thisPage.pathname,
      hostname: thisPage.hostname,
      referrer: document.referrer
    }
    if (pagePvEle) {
      queryData.pv = true;
    }
    if (pageUvEle) {
      queryData.uv = true;
    }
    await fetchJson(`${BASE_API_PATH}/api/visit`, queryData)
      .then((res) => {
        if (res.ret != 'OK') {
          console.error('WebViso.init error', res.message);
          return;
        }
        const resData = res.data;
        if (pagePvEle) {
          pagePvEle.innerText = resData.pv;
        }
        if (pageUvEle) {
          pageUvEle.innerText = resData.uv;
        }
      })
      .catch((err) => {
        console.log("WebViso.init fetch error", err);
      });
  };

  /**
   * @description: Fetch json from api
   * @param {String} url response from url
   * @return {Object}
   */
  function fetchJson(url, data) {
    return new Promise((resolve) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(res => {
        return res.json();
      })
      .then(function(data) {
        resolve(data);
      })
      .catch(err => {
        console.error(err);
      });
    });
  }

  const getLocation = function(href) {
    const l = document.createElement("a");
    l.href = href;
    return l;
  };
  
  if (typeof window !== 'undefined') {
    WebViso.init();
    window.WebViso = WebViso;
  }
})();