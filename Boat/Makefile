TSC=tsc
JS_DIR=./js
TS_DIR=./ts
DEPLOY_FILE=BoatVsSubmarines.zip
DEPLOY_PATH=Boat/

all: BoatVsSubmarines.js

BoatVsSubmarines.js: $(TS_DIR)/*.ts
	$(TSC) $(TS_DIR)/*.ts -out $(JS_DIR)/main.js
	cat $(JS_DIR)/phaser.js > BoatVsSubmarines.js
	cat $(JS_DIR)/main.js >> BoatVsSubmarines.js

clean:
	rm $(JS_DIR)/main.js
	rm BoatVsSubmarines.js
	rm $(DEPLOY_FILE)

deploy: BoatVsSubmarines.js $(TS_DIR)/*.ts
	zip -r $(DEPLOY_FILE) index.html BoatVsSubmarines.js assets/
	@read -p "Username: " username; \
	scp $(DEPLOY_FILE) $$username@ime.usp.br:www/$(DEPLOY_PATH); \
	echo "App enviado para http://www.ime.usp.br/~$$username/$(DEPLOY_PATH)$(DEPLOY_FILE)"
