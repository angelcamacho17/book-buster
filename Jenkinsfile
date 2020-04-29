 pipeline {
    agent any
    environment {
        APPNAME="fecommerce"
        WEBAPPDIR="/data/webapp/${APPNAME}/${BRANCH_NAME}"
        BASEHREF="/${APPNAME}/${BRANCH_NAME}/"
        GITDIR="."
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
    }
    stages {
        stage('Prepare') {
            steps {
                dir(env.GITDIR) {
                    sh 'rm -rf build/logs && rm -rf dist/'
                    sh 'mkdir -p build && mkdir -p build/logs'
                    sh 'rm -rf dist'
                    sh 'npm install --no-optional --no-bin-links --registry http://srvsvn1:4873'
                }
            }
        }
        stage('Lint') {
            steps {
                dir(env.GITDIR) {
                    sh 'ng lint'
                }
            }
        }
        stage('Build') {
            when { 
                anyOf {
                    branch 'Feature*'
                    branch 'develop'
                    branch 'release*'
                }
            }
            steps {
                dir(env.GITDIR) {
                    sh 'ng build --base-href ${BASEHREF} --progress=false'
                    sh 'rm -f build/logs/dist_${BRANCH_NAME}.tar'
                    sh 'chmod -R 755 dist/'
                    sh 'tar -cf build/logs/dist_${BRANCH_NAME}.tar dist/* dist/.htaccess'
                    archiveArtifacts artifacts: "build/logs/*", onlyIfSuccessful: true
                }
            }
        }
        stage('Production build') {
            when { 
                branch 'staging'
            }
            steps {
                dir(env.GITDIR) {
                    sh 'ng build --base-href ${BASEHREF} --build-optimizer --prod --progress=false'
                    sh 'rm -f build/logs/dist_${BRANCH_NAME}.tar'
                    sh 'chmod -R 755 dist/'
                    sh 'tar -cf build/logs/dist_${BRANCH_NAME}.tar dist/* dist/.htaccess'
                    archiveArtifacts artifacts: "build/logs/*", onlyIfSuccessful: true
                }
            }
        }
        stage('Deployment') {
            when {
                anyOf {
                    branch 'staging'
                    branch 'Feature*'
                    branch 'develop'
                    branch 'release*'
                }
            }
            steps {
              milestone(null)
              dir(env.GITDIR) {
                    sh 'mkdir -p ${WEBAPPDIR}/config && mkdir -p ${WEBAPPDIR}/dist'
                    sh 'rm -rf ${WEBAPPDIR}/dist/'
                    sh 'mkdir -p ${WEBAPPDIR}/dist/ && mkdir -p ${WEBAPPDIR}/config/'
                    sh 'tar -xf  build/logs/dist_${BRANCH_NAME}.tar --strip-components=1 -C ${WEBAPPDIR}/dist/'
                    sh '/bin/cp -f ${WEBAPPDIR}/config/* ${WEBAPPDIR}/dist/assets/ 2>/dev/null || :'
                }
            }
        }
    }
    post {
        failure {
            emailext subject: "JOB FAILED: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'", body: "Job FAILED: ${env.JOB_NAME} [${env.BUILD_NUMBER}] ${env.RUN_DISPLAY_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider']]
        }
    }
}