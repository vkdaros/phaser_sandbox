all: src/Application.js src/Scene.js

src/Application.js: src/Application.ts src/Scene.js
	tsc src/Application.ts --out src/Application.js --target ES5

src/Scene.js: src/Scene.ts
	tsc src/Scene.ts --out src/Scene.js --target ES5

clean:
	rm src/Application.js
	rm src/Scene.js
