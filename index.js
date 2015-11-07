var tabs = require("sdk/tabs");
var clipboard = require("sdk/clipboard");
const {Cu} = require("chrome");
// To read & write content to file
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

require("sdk/ui/button/action").ActionButton({
  id: "list-tabs",
  label: "List Tabs",
  icon: "./icon-16.png",
  onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
  var sql = tabs2sql();
//    clipboard.set(sql);
  let encoder = new TextEncoder();
  let array = encoder.encode(sql);
  let promise = OS.File.writeAtomic("/tmp/tabs2bookmarks.sql", array, {tmpPath: "/tmp/tabs2bookmarks.sql.tmp"});
}

function tabs2sql() {
  var result = '';
  for (let tab of tabs) {
      result += 'insert into favourites (Name, Title, FolderID, Url) values (\'chous\', \'' + tab.title.replace(/'/g, '') + '\', 2, \'' + tab.url.replace(/'/g, '') + '\');\n';
  }
  return result;
}
