pipeline {
	agent any

    stages {
        stage('init') {
            steps {
                checkout scm
            }
        }
    }
}

git credentialsId: '0c388efc-1df3-4013-909a-a0618a6a6882', url: 'https://github.com/ron-liu/shorten-url.git'
