>##Author:
> https://github.com/zhaojunlike
>##Mark：
>总结生活的点滴和他人分享，知识是没有高低的，多年后回头来看，才能找出思想的遗漏。欢迎各路老司机带路，重喷，我也虚心接受
>##Why：
>热爱技术的群体。

##对Web服务器的理解
-		

##搭建Web服务器尝鲜
-	

##流行的Web服务器
-	

##Apache与Nginx的优缺点
>如今我已经将所有的服务器的lamp环境，全部替换成lnmp环境



>###优缺点：
>```
>Nginx优点：
	- Nginx相当于Apache的使用，更加的方便和简单。
	- 和Nodejs很多原理一样，Nginx也同样是异步非阻塞的，所以Nginx可以保证高并发。
	- 并且如今感觉Nginx的社区也非常的强大，用户量也占有了很大一部分，一个产品的好不好也可以从社区体现的。
	- 各种配置简单，明了，类Json的格式配置，更加的人性化，相对于Apache的配置来说，更加的方便
	- 我个人不赞同Apache的Rewrite比Nginx强大
	- 模块开发简单，高性能和高可用
	- 反向代理配置简单，集群方便

>```
>```
>Apache优点：
	- 稳定我之前看到很多老的企业，他们的web服务器大多都是IIS和Apache，也足以说明Apache的稳定性。
	- 
	
>```
>以上是我个人的胡话，我不够太深入，只是在使用过程中对2个web服务器的比较，在我学PHP的时候，那个时候都是lamp环境，自从我去学习了nginx，就再也不想去关心apache那繁琐复杂的配置，nginx一个官方文档就搞定。[Nginx-Docs](http://nginx.org/en/docs/)


#Start Test：
##Linux环境，安装Nginx
-	这里我们需要有linux的基础，我个人很推荐尽快去学习linux，你会体会到命令模式的独特魅力
-	所选环境 centos7.2
-	>下载最新版本的stable的源代码包
	>我选择了1.10 [download](http://nginx.org/download/nginx-1.10.2.tar.gz)
	>```
	>#mkdir /home/download/nginx
	>#cd /home/download/nginx
	>#wget http://nginx.org/download/nginx-1.10.2.tar.gz
	>说明1.：我个人有洁癖，所以每一个文件我都喜欢好好的存放和管理起来，所以我创建了一个download/nginx用于放我的文件，也推荐每个人去整理自己的资料。
	>说明2.：如果遇到了wget找不到，请yum install wget一下
	>#tar -zxf ./nginx.....
	>#cd nginx-1.10.2
	>说明：好了下载nginx已经拉下来了，下一步我们去到官方文档，去看看文档当中的安装教程
	>文档在这儿： http://nginx.org/en/docs/configure.html
	>#./configure --help           
	>说明：查看一下配置所需要的一些参数，参数说明请去看文档喔，这里我们就直接安装了
	>#./configure --prefix=/usr/local/nginx1.10
	>#make && make install
	>如下错误：
	>  msg：./configure: error: C compiler cc is not found
	>  ```
	
![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/err_cnotfound.png)
-	>```
		>#yum install gcc
		>try again
		>如下错误：
		>  msg：
		>  ./configure: error: the HTTP rewrite module requires the PCRE library.
		You can either disable the module by using --without-http_rewrite_module
		option, or install the PCRE library into the system, or build the PCRE library
		statically from the source with nginx by using --with-pcre=<path> option.

	>```
![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/err_httprewrite.png)
	>```	
	>Chinese：http重写模块需要pcre lib库，你可以配置--with-out..去取消这个模块，否则请安装pcre到system库，或者指定您安装的--with-pcre=path
	>#好，既然他需要这个东西，我们就去安装就行了
	>上图：
	>```

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/err_pcrehavainstalled.png)

	>```
	>这下尴尬了，系统说已经装了这个东西了。不急，我们先看看dev开发版本得库是不是安装了
	>，因为软件编译嘛，肯定是需要开发版本的源代码，才可以编译，至少我个人是这么理解的。那我去试一试
	>```
	
![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/suc_installpcre.png)

	>```
	>哎哟，有这个，管他的装上再说
	>然后再试一试编译
	>。。。。过度时间，么么哒
	>```

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/err_gizpnotfound.png)
	
	>```
	>哎呀又是一个gzip库，我们按照原来的方式去处理就行了
	>#yum install zlib
	>#yum install zlib-devel
	>然后接着再尝试
	>....等待时间，么么哒
	>哎哟，成功了哟
	>```

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/suc_configure.png)
 
>##总结
>- nginx安装需要的一些工具：gcc
>- nginx需要的一些基本库：zlib-devel,pcre-devel,
>
>##完成安装
>```
>#make && make install
>```

##信号量的概念
>###what is signal? let's see
>我们之前再windows基本上都没有听过信号量这个概念，这学期有一门操作系统的课程，就讲到信号量这个盖联:
>- 信号量的使用主要是用来保护共享资源，使得资源在一个时刻只有一个进程（线程）所拥有。（啧啧，听不懂）
>- 。。。。。
>- 不管了，想去看的请自行百度
>- 来接下来我们看文档

```
doc:
		Starting, Stopping, and Reloading Configuration
		
		To start nginx, run the executable file. Once nginx is started, it can be controlled by invoking the executable with the -s parameter. Use the following syntax:
		
		##nginx -s signal
		Where signal may be one of the following:
		
		stop — fast shutdown
		quit — graceful shutdown
		reload — reloading the configuration file
		reopen — reopening the log files
		For example, to stop nginx processes with waiting for the worker processes to finish serving current requests, the following command can be executed:
		
		#nginx -s quit
		This command should be executed under the same user that started nginx.
		Changes made in the configuration file will not be applied until the command to reload configuration is sent to nginx or it is restarted. To reload configuration, execute:
		
		#nginx -s reload
		Once the master process receives the signal to reload configuration, it checks the syntax validity of the new configuration file and tries to apply the configuration provided in it. If this is a success, the master process starts new worker processes and sends messages to old worker processes, requesting them to shut down. Otherwise, the master process rolls back the changes and continues to work with the old configuration. Old worker processes, receiving a command to shut down, stop accepting new connections and continue to service current requests until all such requests are serviced. After that, the old worker processes exit.
		
		A signal may also be sent to nginx processes with the help of Unix tools such as the kill utility. In this case a signal is sent directly to a process with a given process ID. The process ID of the nginx master process is written, by default, to the nginx.pid in the directory /usr/local/nginx/logs or /var/run. For example, if the master process ID is 1628, to send the QUIT signal resulting in nginx’s graceful shutdown, execute:
		
		#kill -s QUIT 1628
		For getting the list of all running nginx processes, the ps utility may be used, for example, in the following way:
		
		#ps -ax | grep nginx
		For more information on sending signals to nginx, see Controlling nginx.
```
>我只看到了几个重要的，来来来看下：
>- nginx -s  $param 发送信号 
>- nginx -s stop   停止
>- nginx -s reload 重启
>走着先不管，我们去试一试
>- 因为我是
>- 走：请求一下 http://ip/
>
>- 发现访问不了，尴尬，我的是跑的虚拟机，没道理啊，我xshell都能连，就说明我ip是正确的，所以我确定可能是端口没有开放访问

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/http_err.png)


>###开放80web端口
>- 1.找到我们的防火墙兄弟：# vim /etc/sysconfig/iptables
>- 2.记住，不懂得东西，千万不要放过任何一个提示，任何一行英文，否则你懂得。。。。、
>- 3.现在看看22端口

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/iptables_22.png)

>- 4.#按照他得方式给他一个：-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
>- 5.想知道这些参数的什么意思，请自行百度哈

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/iptables_80.png)

>- 6.改了配置总得重启吧? 走着: # systemctl restart iptables
>- 7.对了,新版的linux 好像都在使用systemctl来进行service控制了，我们要跟上时代的脚步喔

>- 成功了

![](https://raw.githubusercontent.com/zhaojunlike/our_org_blog/master/2016-11-12%20第四次分享%20web%20server/images/show_suc.png)


##和nginx交流
-	

##nginx的配置
-	

##运维所需要的知识
-	

##nginx配搭PHP
-	

##nginx进行rewrite重写和重写规则
-	

##压力测试
-	

##nginx的反向代理
-	

##nginx的集群
-	

##推荐网址
-	http://www.wdlinux.cn/wdcp/   一件安装linux环境
-	https://amh.sh/index.htm?amh  主机控制面板


