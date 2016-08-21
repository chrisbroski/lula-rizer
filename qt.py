# import os, sys
# import thread
#
# from PyQt4.QtWebKit import QWebView
# from PyQt4.QtGui import QApplication
# from PyQt4.QtCore import QUrl
#
# app = QApplication(sys.argv)
#
# browser = QWebView()
# file = os.path.abspath('ui.html')
# browser.load(QUrl('file://' + file))
# browser.show()
#
# app.exec_()

import sys
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from PyQt4.QtWebKit import *


# js = \
# """
# QFile = function(path)
# {
#     var name = _QFile_factory.createQFile(path);
#     document.getElementById("name").innerText = name;
#     return _wrapper;
# }
# """
#
# html = \
# """<html>
# <head>
#   <title>JavaScript Qt Wrapper Test</title>
#   <script type="text/javascript">
#     function readFile()
#     {
#         var file1 = QFile("/Users/christopherbroski/projects/lula-rizer/README.md");       # <- put a path to a text file here
#         //var file2 = QFile("qtwrappertest.py");          # <- refer to this script or some other text file here
#         var area1 = document.getElementById("contents1");
#         //var area2 = document.getElementById("contents2");
#         file1.open(1);
#         //file2.open(1);
#         area1.innerText = file1.readAll;
#         //area2.innerText = file2.readAll;
#         file1.close();
#         //file2.close();
#     }
#   </script>
# </head>
# <body>
#   <h1>JavaScript Qt Wrapper Test</h1>
#   <p id="name"></p>
#   <pre id="contents1">
#      [Click the button to show the contents of a file.]
#   </pre>
#   <pre id="contents2">
#      [Click the button to show the contents of a file.]
#   </pre>
#   <input type="button" onclick="readFile()" value="Click me">
# </body>
# </html>
# """
#
# class FileWrapper(QObject):
#
#     def __init__(self, path):
#
#         QObject.__init__(self)
#         self.file = QFile(path)
#
#     @pyqtSignature("open(int)")
#     def open(self, flags):
#
#         return self.file.open(QIODevice.OpenModeFlag(flags))
#
#     def readAll(self):
#
#         return str(self.file.readAll())
#
#     readAll = pyqtProperty("QString", readAll)
#
#     @pyqtSignature("close()")
#     def close(self):
#
#         self.file.close()
#
# class Browser(QWebView):
#
#     def __init__(self, parent = None):
#
#         QWebView.__init__(self, parent)
#         self.connect(self, SIGNAL("loadFinished(bool)"), self.prepareJavaScript)
#
#     def prepareJavaScript(self, ready):
#
#         if not ready:
#             return
#
#         self.page().mainFrame().addToJavaScriptWindowObject("_QFile_factory", self)
#         self.page().mainFrame().evaluateJavaScript(js)
#
#     @pyqtSignature("createQFile(QString)")
#     def createQFile(self, path):
#
#         self.page().mainFrame().addToJavaScriptWindowObject("_wrapper", FileWrapper(path))
#         return "_wrapper"
#
#
# if __name__ == "__main__":
#
#     app = QApplication(sys.argv)
#     browser = Browser()
#     browser.setHtml(html)
#     browser.show()
#     sys.exit(app.exec_())

import sys
from PyQt4 import QtCore, QtGui, QtWebKit

"""Html snippet."""
html = """
<html><body>
  <center>
  <script language="JavaScript">
    document.write('<p>Python ' + pyObj.pyVersion + '</p>')
  </script>
  <button onClick="pyObj.showMessage('Hello from WebKit')">Press me</button>
  </center>
</body></html>
"""

class jsMain(QtCore.QObject):
    """Simple class with one slot and one read-only property."""

    @QtCore.pyqtSlot(str)
    def showMessage(self, msg):
        """Open a message box and display the specified message."""
        QtGui.QMessageBox.information(None, "Info", msg)

    def _pyVersion(self):
        """Return the Python version."""
        return sys.version

    """Python interpreter version property."""
    pyVersion = QtCore.pyqtProperty(str, fget=_pyVersion)

def main():
    app = QtGui.QApplication(sys.argv)

    jsFunctions = jsMain()

    webView = QtWebKit.QWebView()
    # Make myObj exposed as JavaScript object named 'pyObj'
    webView.page().mainFrame().addToJavaScriptWindowObject("pyObj", jsFunctions)
    webView.setHtml(html)

    window = QtGui.QMainWindow()
    window.setCentralWidget(webView)
    window.show()

    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
