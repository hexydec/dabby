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

function getDependencies($code) {
	if (($modules = getModules()) !== false) {
		$pattern = '/('.implode('|', array_map('preg_quote', array_keys($modules))).')\(/';
		if (preg_match_all($pattern, $code, $match)) {
			return array_unique($match[1]);
		}
	}
	return false;
}

$output = Array();
if (!empty($_POST['code']) && !empty($_POST['outdir'])) {
	if (($dependencies = getDependencies($_POST['code'])) !== false) {
		$cmd = 'grunt --include='.implode(',', $dependencies).' --outdir='.escapeshellarg($_POST['outdir']);
		if (exec($cmd, $output, $return)) {
			$output = array_filter($output);
			$_POST = Array();
		}
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Dabby.js Custom Build Scanner</title>
		<style>
		body {
			font-family: Segoe UI, Verdana, Arial, Helvetica, sans-serif;
		}
		.scan__heading {
			font-weight: normal;
		}
		.scan__logo {
			vertical-align: top;
			margin-right: 20px;
		}
		.scan__msg {
			padding: 10px;
			background: green;
			color: #FFF;
		}
		.scan__control {
			padding: 3px 0;
		}
		.scan__code {
			width: 100%;
			height: 60vh;
			box-sizing: border-box;
			line-height: 1.4em;
			padding: 10px;
			border: 1px solid #666;
			margin: 10px 0;
		}
		.scan__dir {
			width: 50%;
			padding: 5px;
			border: 1px solid #666;
		}
		.scan__submit {
			width: 60%;
			display: block;
			margin: 0 auto;
			padding: 10px;
			background: green;
			color: #FFF;
			border: 0;
			border: 0;
			box-shadow: 0 0 5px #CCC;
		}
		</style>
	</head>
	<body>
		<h1 class="scan__heading"><img src="../tests/dabby.js.svg" alt="Dabby.js" width="190" class="scan__logo" />Custom Build Scanner</h1>
		<?php if ($output) { ?>
			<div class="scan__msg"><?= implode('<br />', array_map('htmlspecialchars', $output)); ?></div>
		<?php } ?>
		<form src="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>" accept-charset="<?= htmlspecialchars(mb_internal_encoding()) ?>" method="post">
			<div class="scan__control">
				<label for="code">Paste Javascript with no Dabby or jQuery here:</label>
				<textarea id="code" name="code" class="scan__code"><?= isset($_POST['code']) ? htmlspecialchars($_POST['code']) : ''; ?></textarea>
			</div>
			<div class="scan__control">
				<label for="outdir">Output Folder:</label>
				<input type="text" class="scan__dir" name="outdir" value="<?= isset($_POST['outdir']) ? htmlspecialchars($_POST['outdir']) : 'dist/custom'; ?>"
				Dabby.js />
			</div>
			<div class="scan__control">
				<input type="submit" id="outdir" value="Scan" class="scan__submit" />
			</div>
		</form>
	</body>
</html>
