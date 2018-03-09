module.exports = (vitreum) => {
	return `<html>
	<head>
		<meta name="viewport" content="width=device-width">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		${vitreum.head}
		<title>Event Thingie 9000</title>
	</head>
	<body>
		<main id="reactRoot">${vitreum.body}</main>
	</body>
	${vitreum.js}
</html>`;
};
