CodeMirror.defineSimpleMode("tse", {
	start: [
		{
			regex: /\d*\.?\d+/g,
			token: "numbers",
		},
		{
			regex: /({=\(comment\):).*}/gi,
			token: "comment",
		},
		{
			regex: /\{/g,
			token: "lb brackets",
		},
		{
			regex: /\}/g,
			token: "rb brackets",
		},
		{
			regex: /\(/g,
			token: "lp operators",
		},
		{
			regex: /\)/g,
			token: "rp operators",
		},
		{
			regex: /\:/g,
			token: "colon operators",
		},
		{
			regex: /(==|!=|(?<!>)<=|\||\+|(?<!<?)\/|\*|~|,|__|\^)/g,
			token: "operators",
		},
		{
			regex: /(m|math|\+|m)(?=(\:|\(|\}))/g,
			token: "blocks mathblock",
		},
		{
			regex:
				/(unix|uses|args|message|join|replace|if|any|all|and|or|break|contains|strf|#|random|rand|urlencode|td|index|list|cycle|=|let|assign|in|upper|lower|50:|c|cmd|redirect|require|blacklist|react|reactu|dm|delete|silent|silence|override|lvl|range)(?=(\:|\(|\}))/g,
			token: "blocks",
		},
		{
			regex: /(user|target|server)(?=(\:|\(|\}))/g,
			token: "blocks canparam",
		},
		{
			regex:
				/(avatar|id|created_at|joined_at|roleids|color|name|proper|position|icon|owner|randomonline|randomoffline|members|bots|humans|roles|channels|topic|slowmode|mention)(?=\))/g,
			token: "parameters",
		},
		{
			regex: /(trunc|round|abs)/g,
			token: "math",
		},
		{
			regex: /(true|false)/g,
			token: "boolean",
		},
		{
			regex: /(https?)/g,
			token: "http",
		},
		{
			regex:
				/(%a|%A|%w|%d|%-d|%b|%B|%m|%-m|%y|%Y|%H|%-H|%I|%-I|%p|%M|%-M|%S|%-S|%f|%z|%Z|%j|%-j|%U|%W|%c|%x|%X|%u|%n|%i|%s)/g,
			token: "strf",
		},
		{
			regex: /.+?/,
			token: "text",
		},
	],
});

let editor = CodeMirror(document.getElementById('code'), {
  value: "",
  mode: "tse",
  theme: "tse",
  lineWrapping: true,
});

document.getElementsByClassName('CodeMirror')[0].addEventListener('keyup', key => {
  const opening = editor.getValue().split("{").length - 1;
	const closing = editor.getValue().split("}").length - 1;
  if (opening !== closing) {
    document.getElementById('isBalanced').innerHTML = "❌"
  } else {
    document.getElementById('isBalanced').innerHTML = "✅"
  }

  console.log(editor.doc.size)
  
  document.getElementById('charCount').innerHTML = editor.getValue().split('').length
  document.getElementById('lineCount').innerHTML = editor.doc.size
  
});

// editor.getDoc().setValue(editor.getValue() + '\n\nvar msg = "Hi";');
const data = JSON.parse(tagData)

document.addEventListener('click', (event) => {
  if (!event.target.nodeName === 'BUTTON' || !event.target.id.startsWith('modal-')) return;
  const category = event.target.id.split('-')[1]
  const resource = event.target.id.split('-')[2]
  console.log(category, resource)

  

  editor.getDoc().setValue(editor.getValue() + '\n\n' + data[category-1][resource-1].content);
})