@echo on

echo Copying files to %1%

set res_path=%1%\src\main\resources\static
xcopy "resources" %res_path% /s/h/e/k/f/c/y

set pages_path=%1%\src\main\webapp\WEB-INF\jsp
xcopy "pages" %pages_path% /s/h/e/k/f/c/y