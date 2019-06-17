@echo off

echo Copying files to %1%

echo ~~ PAGES files ~~
set pages_path=%1%\src\main\webapp\WEB-INF\jsp
rmdir %pages_path% /s/q
mkdir %pages_path%
::xcopy "pages" %pages_path% /s/h/e/k/f/c/y
xcopy "pages" %pages_path% /s/h/e/k/c/y/q

echo ~~ RESOURCES files ~~
set res_path=%1%\src\main\resources\static
rmdir %res_path% /s/q
mkdir %res_path%
::xcopy "resources" %res_path% /s/h/e/k/f/c/y
xcopy "resources" %res_path% /s/h/e/k/c/y/q