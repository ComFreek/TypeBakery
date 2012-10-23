tsc EventHandler/EventHandler.ts EventHandler/EventHandler-UT.ts UnitTest/UnitTest.ts UnitTest/RunUnitTests.ts --out build/all.js
tsc EventHandler/EventHandler.ts EventHandler/EventHandler-UT.ts UnitTest/UnitTest.ts UnitTest/RunUnitTests.ts --out UnitTest/all.js

COPY "UnitTest\RunUnitTests.html" "build\RunUnitTests.html"
COPY "UnitTest\RunUnitTests.css" "build\RunUnitTests.css"