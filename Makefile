
# Directories
SRC			= ./src
DIST		= ./dist
BIN			= ./node_modules/.bin

# Files
TS_ALL	= $(wildcard $(SRC)/*.ts) $(wildcard $(SRC)/**/*.ts)
TS_SRC	= $(filter-out %.spec.ts,$(TS_ALL)) # Exclude test files
JS_DIST	= $(TS_SRC:$(SRC)/%.ts=$(DIST)/%.js)
SPECS		= $(shell find $(SRC) -name "*.spec.ts")

# Commands
NYC			= $(BIN)/nyc
STYLE		= $(BIN)/prettier
TAP_NYC	= $(BIN)/tap-nyc
TAP_DOT	= $(BIN)/tap-dot
TAPE		= $(BIN)/tape
TS_NODE	= $(BIN)/ts-node
TS			= $(BIN)/tsc

# Get Properties from package.json
FROM_PACKAGE_JSON = $(shell grep \"$1\" package.json \
					| awk -F'": "' '{print $$2}' \
					| tr -d '",') 

VERSION	= $(call FROM_PACKAGE_JSON,version)
NAME		= $(call FROM_PACKAGE_JSON,name)

# Run all prerequesites as tests
define test-run =
$(TS_NODE) --require 'tape/bin/tape' $?
endef

.PHONY: build clean help install style test test.cov test.raw

build: $(DIST) ## Compile all source file to DIST

$(DIST): $(JS_DIST)
$(DIST)/%.js: $(SRC)/%.ts
	$(TS) --outDir $(@D) $?

install: ## Link this npm package
	npm link

clean: ## Remove the output directory
	rm -rf $(DIST)

style: $(TS_ALL) ## Format code
	$(STYLE) \
		--write \
		--no-color \
	 	$?


test: $(SPECS) ## Run all tests with tap-dot output
	@$(test-run) | $(TAP_DOT)

test.raw: $(SPECS) ## Run all tests with tape output
	@$(test-run)

test.cov: $(SPECS) ## Run all tests and generate coverage
	@$(NYC) \
		--source-map \
		--exclude-after-remap \
		--reporter text \
		--extension '.ts' \
		--include 'src/**/*.ts' \
		--exclude 'src/**/*.spec.ts' \
		$(test-run)

help: ## Show this help message
	@echo "$(NAME) $(VERSION) - Makefile\n"
	@echo "\033[36mDIST \033[0m$(DIST)\n"
	@awk -F ":.*?## " \
		'$$0 ~ /^\t/ {next;} \
		$$0 ~ /#{2}/ {printf "\033[36m%s\033[0m %s\n", $$1, $$2}' \
		$(MAKEFILE_LIST)
