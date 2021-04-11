DEPLOY_FILE = tools/deploy.sh

deploy: $(DEPLOY_FILE)
	tools/deploy.sh

init: $(INIT_FILE)
	tools/init_deploy.sh