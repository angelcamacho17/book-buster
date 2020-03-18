 pipeline {
    agent any
    environment {
        APPNAME="fe_commerce"
        WEBAPPDIR="/data/webapp/${APPNAME}/${BRANCH_NAME}"
        BASEHREF="/${APPNAME}/${BRANCH_NAME}/"
        GITDIR="." // this is normally '.', except with sparse git directories (several projects in 1 git repo)
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
    }
    stages {
        stage('prepare') {
            steps {
                dir(env.GITDIR) {
                    sh 'rm -rf build/logs && rm -rf dist/'
                    sh 'mkdir -p build && mkdir -p build/logs'
                    sh 'rm -rf dist'
                    // https://askubuntu.com/questions/269727/npm-errors-when-installing-packages-on-windows-share/588962
                    sh 'npm install --no-optional --no-bin-links --registry http://srvsvn1:4873'
                }
            }
        }
        stage('lint') {
            steps {
                dir(env.GITDIR) {
                    sh 'ng lint'
                }
            }
        }
        /*stage('tests and code coverage') {
            steps {
                dir(env.GITDIR) {
                    sh 'ng test --watch=false --code-coverage --progress=false'
                    xunit testTimeMargin: '3000', thresholdMode: 1, thresholds: [failed(), skipped()], tools: [JUnit(deleteOutputFiles: true, failIfNotNew: true, pattern: "build/logs/junit.xml", skipNoTestFiles: false, stopProcessingIfError: true)]
                    publishHTML(target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: "coverage", reportFiles: 'index.html', reportName: 'Code coverage'])
                }
            }
        } */
        stage('build') {
            when { 
                anyOf {
                    branch 'Feature*'
                    branch 'develop'
                    branch 'release*'
                }
            }
            steps {
                dir(env.GITDIR) {
                    sh 'ng build --base-href ${BASEHREF} --progress=false  && cp ./.htaccess ./dist/fecommerce/.htaccess'
                    sh 'rm -f build/logs/dist_${BRANCH_NAME}.tar'
                    sh 'chmod -R 755 dist/'
                    sh 'tar -cf build/logs/dist_${BRANCH_NAME}.tar dist/* dist/.htaccess'
                    archiveArtifacts artifacts: "build/logs/*", onlyIfSuccessful: true
                }
            }
        }
        stage('build prod') {
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
        stage('deploy') {
            when {
                anyOf {
                    branch 'Feature*'
                    branch 'develop'
                    branch 'staging'
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