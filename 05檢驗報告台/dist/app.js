(function(){"use strict";kintone.events.on(["app.record.edit.show","mobile.app.record.edit.show","app.record.index.edit.show"],e=>{const r=e.record;return r.病歷號碼.disabled=!0,r.檢驗單號.disabled=!0,r.檢驗代碼.disabled=!0,r.採檢時間.disabled=!0,r.報告時間.disabled=!0,r.發報告者.disabled=!0,e}),kintone.events.on(["app.record.detail.process.proceed"],e=>{const r=kintone.getLoginUser();if(e.action.value==="發報告")return e.record.報告時間.value=new Date().toISOString(),e.record.發報告者.value=[{code:r.code,name:r.name}],e;if(e.action.value==="撤回"&&e.record.發報告者.value[0].code!==r.code)return e.error="僅能由發報告者撤回",e})})();
