var motd = `
Human hydrogen 17.5.3 #1 SMP PREEMPT 2003-XX-XX 10:40:51 +0000 Human/XNH
                   __ _           _ _       
__  __ ______   __/ _( )___    ___(_) |_ ___ 
\\ \\/ /|_  /\\ \\ / / |_|// __|  / __| | __/ _ \\
 >  <  / /  \\ V /|  _| \\__ \\  \\__ \\ | ||  __/
/_/\\_\\/___|  \\_/ |_|   |___/  |___/_|\\__\\___|

Last change: 2020-06-19 23:50:51 CEST from lithium.periodic.table


The programs included with the Human XNH/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /luser/share/doc/*/copyright.

Human XNH/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.

Long live the Benevolent Leader for Life of the XNH (XNH is Not Human) project!

`
var t_about = `
# About xzvf
---


`;

var t_contact = `
# contact me
---


`;

var t_projects = `
# my projects
---


`;

var t_shellinfo = `
# shell info
---
This is a terrible fake "shell". No support for pipes, redirection, wildcards and
only the following commands are supported:

- cd
- ls
- cat

`;

//colors from clrs.cc
var c_red = "#FF4136";
var c_yellow = "#FFDC00";
var c_blue = "#0074D9";
var c_green = "#2ECC40";

var printable = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '"', '£', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', '#', '@', ';', ':', '/', '?', '.', '>', ',', '<', '\\', '|']


document.addEventListener('DOMContentLoaded', () => {
    var t = document.getElementsByClassName("terminal-content")[0];
    var command = "";

    //state
    var __stdout = "";
    var stdout = [];
    var cwd = "/home/xzvf/";
    var user = "xzvf";
    var host = "www";

    var files = { 
        "/": ["home/", "bin/", "proc/", "usr/", "boot/", "sys/", "dev/", "etc/", "opt/", "var/"],
        "/bin/": ["cat"],
        "/home/": ["xzvf/"],
        "/home/xzvf/": ["about.md",  "contact.md", "projects.md", "shellinfo.md"]
    }

    setInterval(() => {
        if (stdout.length > 0) {
            __stdout += stdout[0];
            stdout = stdout.slice(1);
            t.innerHTML = __stdout;
            t.scrollTop = t.scrollHeight;
        }
    }, 5);
    document.addEventListener("keydown", (ev) => {
        var key = ev.key;
        if (key == "Enter") {
            executeCommand(command);
            command = "";
        } else if (key == "Backspace") {
            if (command.length > 0) {
                __stdout = __stdout.slice(0, -1);
                t.innerHTML = __stdout;
                command = command.slice(0, -1);
            }
        } else if (key == "Delete") {
        } else if (printable.includes(key)) {
            command += key;
            stdout.push(key);
        }
        ev.preventDefault();
    });

    function executeCommand(cmd) {
        cmd = cmd.trim().split(' ');
        stdout.push("</br>");
        if (cmd[0] == "") {
            
        } else if (cmd[0] == "clear") {
            stdout = [];
            __stdout = "";
        } else if (cmd[0] == "ls") {
            var f = files[cwd] || [];
            
            f.forEach(e => {
                e.split('').forEach(c => {
                    stdout.push(c);
                });
                stdout.push("\t");
            });
            stdout.push("</br>");
        } else if (cmd[0] == "cat") {
            console.log(cmd);
            cmd.slice(1).forEach(f => {
                if(f == "about.md")
                    t_about.split('').forEach(c => {
                        stdout.push(c);
                    });
                else if(f == "contact.md")
                    t_contact.split('').forEach(c => {
                        stdout.push(c);
                    });
                else if(f == "projects.md")
                    t_projects.split('').forEach(c => {
                        stdout.push(c);
                    });
                else if(f == "shellinfo.md")
                    t_shellinfo.split('').forEach(c => {
                        stdout.push(c);
                    });
                else
                    "No such file".split('').forEach(c => {
                        stdout.push(c);
                    });
                stdout.push("</br>");
            });
        } else {
            stdout.push(cmd[0] + ": unknown command");
            stdout.push("</br>");
        }
        stdout = stdout.concat(prompt());
    }

    function cs(s, color) {
        var r = [];
        s.split('').forEach(e => {
            r.push('<p style="display:inline; color: ' + color + ';">' + e + "</p>");
        });
        return r;
    }

    function prompt() {
        var p = [];
        p = p.concat(cs(user, c_red));
        p = p.concat(cs("@", c_yellow));
        p = p.concat(cs(host, c_green));
        p.push(":");
        var path = "";
        if (cwd === "/home/" + user + "/") {
            path += "~";
        } else {
            path += cwd;
        }
        p = p.concat(cs(path, c_blue));
        p.push(" ");
        p = p.concat(cs((user == "root") ? "#" : "$", c_red));
        p.push(" ");
        return p;
    }


    stdout = stdout.concat(motd.split(''));
    stdout = stdout.concat(prompt());
    stdout = stdout.concat("ls".split(''));
    executeCommand("ls");
    stdout = stdout.concat("cat shellinfo.md".split(''));
    executeCommand("cat shellinfo.md");
    
}, false);

