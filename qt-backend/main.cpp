#include <QCoreApplication>
#include <QProcess>
#include <QTimer>
#include <QDebug>

int main(int argc, char *argv[]) {
    QCoreApplication app(argc, argv);

    QTimer::singleShot(2000, []() {
        qDebug() << "Qt Backend: Sending message to Electron";
        // Simulate a backend message
        printf("Message from Qt Backend: Hello Electron!\n");
        fflush(stdout);  // Make sure the output is sent immediately
    });

    return app.exec();
}

