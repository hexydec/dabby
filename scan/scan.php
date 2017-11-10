<?php

// find dabby functions and dependencies
function getModules() {
	$modules = Array();
	if (($files = glob(dirname(__DIR__).'/src/{*/,*/*/,}*.js', GLOB_BRACE)) !== false) {
		foreach ($files AS $item) {
			if (substr($item, -7) != 'test.js' && ($js = file_get_contents($item)) !== false) {

				// find $.fn.functioName
				if (preg_match_all('/\$(?:\.fn)?\.([a-z]++) =/i', $js, $match)) {
					foreach ($match[1] AS $func) {
						$modules[$func] = Array(
							'file' => $item,
							'content' => $js
						);
					}

				// find array of functions
				} elseif (preg_match_all('/^\[([^\]]++)\]\.forEach/i', $js, $match)) {
					foreach (explode('", "', trim($match[1][0], '"')) AS $func) {
						$modules[strtolower(substr($func, 0, 1)).substr($func, 1)] = Array(
							'file' => $item,
							'content' => $js
						);
					}

				// find $.each of functions
				} elseif (preg_match('/^\$\.each\(\{([^\}]+)/i', $js, $match)) {
					foreach (explode(',', $match[1]) AS $func) {
						$modules[trim(strstr($func, ":", true))] = Array(
							'file' => $item,
							'content' => $js
						);
					}
				} elseif (preg_match('/function ([^\(]++)/i', $js, $match)) {
					$modules[$match[1]] = Array(
						'file' => $item,
						'content' => $js
					);
				}
			}
		}
	}

	// work out dependencies
	$functions = array_keys($modules);
	foreach ($modules AS &$item) {
		if (preg_match_all('/('.implode('|', array_map('preg_quote', $functions)).')\(/', $item['content'], $match)) {
			$item['dependencies'] = array_unique($match[1]);
		}
	}
	return $modules;
}

if (!empty($_POST['code'])) {
	$modules = getModules();
	if (preg_match_all('/('.implode('|', array_map('preg_quote', array_keys($modules))).')\(/', $_POST['code'], $match)) {
		var_dump($match);
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Dabby.js Include Scanner</title>
	</head>
	<body>
		<h1>Dabby.js Include Scanner</h1>
		<form src="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>" accept-charset="<?= htmlspecialchars(mb_internal_encoding()) ?>" method="post">
			<label for="code">Javascript</label>
			<textarea id="code" name="code"><?= isset($_POST['code']) ? htmlspecialchars($_POST['code']) : ''; ?></textarea>
			<input type="submit" value="Scan" />
		</form>
	</body>
</html>
