# Dabby.js To Do List

This project is currently pretty close to a feature complete, stable beta release, this is a list of what needs doing to get it there:

- [x] Implement JSON-P requests in $.ajax()
- [x] Implement $.fn.replaceAll() and $.fn.replaceWith()
- [ ] Implement $.fn.serializeArray() (Is this needed??)
- [ ] Implement $.fn.wrapInner()
- [x] Implement $.fn.closest()
- [ ] Write basic documentation for each method, along with example, and differences to jQuery
- [ ] Write basic tests for each method
- [ ] Go over each method and check that each argument fingerprint is either covered or not going to be implemented
- [ ] Update existing tests to include all fingerprints
- [ ] Fix bugs!!!

Things to do in the future:

- [ ] More extensive test coverage
- [ ] More extensive jQuery API coverage?
- [ ] Build a Grunt package for NPM
- [x] Rewrite scanner in Javascript (**Use ES6 module imports for custom builds**)
- [x] integrate scanner into Grunt package so custom builds can be created as part of a workflow (**No longer needed**)
