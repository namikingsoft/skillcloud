import FullBlock from 'components/FullBlock'
import CloudLink from 'components/CloudLink'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import Skill from 'domains/Skill'
import SkillNode from 'domains/SkillNode'
import * as SkillConst from 'constants/SkillConst'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  selected: Skill
  selectSkill: (skill: Skill)=>Object
}

interface State {
  transform?: string
  transition?: string
  opacity?: number
  display?: string
}

@connect(
  state => clone(state.skill),
  dispatch => bindActionCreators(Action, dispatch)
)

export default class Index extends Component<Props, State>
{
  render() {
    return (
      <div className="layout-index">
        <div className="block__svg" style={this.state}>
          <SkillCloudCanvas
            cloud={SkillConst.rootCloud}
            selected={this.selectedNode}
            onRide={skill => null}
            onDown={skill => null} />
          <div className="block__svg__guard" />
        </div>
        <FullBlock className="block block__profile">
          <div className="half block__profile__meta">
            <div className="block__profile__meta__position">
              フロントエンドエンジニア
            </div>
            <div className="block__profile__meta__name">
              並木　翼
            </div>
            <div className="block__profile__meta__ruby">
              Tsubasa Namiki
            </div>
            <div className="block__profile__meta__sns">
              <ul>
                <li><a href="http://github.com/namikingsoft/"><i className="fa fa-github"></i> GitHub</a></li>
                <li><a href="https://twitter.com/namikingsoft/"><i className="fa fa-twitter"></i> Twitter</a></li>
                <li><a href="http://blog.namiking.net/"><i className="fa fa-home"></i> Blog</a></li>
              </ul>
            </div>
          </div>
        </FullBlock>
        <FullBlock className="block block__index">
          <div className="half block__index__anchor">
            <h2>主な制作実績の紹介</h2>
            <ul>
              <li>
                <a href="#tachiyomi">
                  <h3>ブラウザで立ち読みできる電子書籍ビューア</h3>
                  <p>
                    オーディオ再生や元ファイル抽出を防止する難読化機能など。
                  </p>
                </a>
              </li>
              <li>
                <a href="#search">
                  <h3>言葉の連想を利用した検索ソリューション</h3>
                  <p>
                    検索結果や連想ワードをグラフィカルに表現した前衛的UIが特徴。
                  </p>
                </a>
              </li>
              <li>
                <a href="#fullstack">
                  <h3>スマホで打刻できる勤怠管理システム</h3>
                  <p>
                    アプリ開発からインフラ構築までフルスタックに対応。
                  </p>
                </a>
              </li>
              <li>
                <a href="#automation">
                  <h3>インフラ環境構築の自動化</h3>
                  <p>
                    開発環境の自動構築からCIツールとの連携部分の構築を担当。
                  </p>
                </a>
              </li>
              <li>
                <a href="#skillcloud">
                  <h3>フロントエンドのデモンストレーション</h3>
                  <p>
                    技術ごとの経験や興味を視覚化したスキルクラウド。
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <div className="half block__index__technology">
            <div className="block__index__technology__text">
                <h2>最近よく使う技術</h2>
                <p>
                  新しい物が好きで、ここには全てを書ききれませんが、<br/>
                  あえて数点にしぼってみました。
                </p>
            </div>
            <div className="block__index__technology__logo">
              <ul>
                <li><a href="https://nodejs.org/"><img src="/images/logo-nodejs.png" /></a></li>
                <li><a href="http://www.typescriptlang.org/"><img src="/images/logo-typescript.png" /></a></li>
                <li><a href="https://facebook.github.io/react/"><img src="/images/logo-react.png" /></a></li>
                <li><a href="http://d3js.org/"><img src="/images/screen-d3js.png" /></a></li>
                <li><a href="https://www.docker.com/"><img src="/images/logo-docker.png" /></a></li>
                <li><a href="https://facebook.github.io/react/"><img src="/images/logo-mongodb.png" /></a></li>
              </ul>
            </div>
          </div>
        </FullBlock>
        <FullBlock className="block block__tachiyomi" id="tachiyomi">
          <div className="half block__tachiyomi__text">
            <strong>ブラウザで立ち読みできる電子書籍ビューア</strong>
            <h2>サイト訪問者を楽しませたかった。</h2>
            <p>
              誰に言われるわけでもなく、気づいたらプロトタイプを作っていました。
              １プロジェクトの立ち上げに成功し、運用開発を含めたリーダーとして携わりました。
            </p>
            <p>
              導入後、立ち読みコンテンツを起点としたページの
              検索オーガニック流入が大幅にアップしました。
            </p>
            <div className="meta">
              <h3>開発期間・規模</h3>
              <ul>
                <li>開発2014年中期2〜3ヶ月(1〜3人)</li>
              </ul>
              <h3>担当範囲</h3>
              <ul>
                <li>プロジェクトリーダー</li>
                <li>メインプログラマ</li>
              </ul>
              <h3>使用技術</h3>
              <ul>
                <li>HTML5 Canvas</li>
                <li>HTML5 Audio</li>
                <li>Backbone.js</li>
                <li>Grunt</li>
                <li>Browserify</li>
              </ul>
            </div>
          </div>
          <div className="half block__tachiyomi__image">
            <img className="display" src="/images/display1.png" />
            <img className="anime" src="/images/tachiyomi.gif" />
            <small>
            画像提供：
            漫画 on web
            ブラックジャックによろしく
            佐藤秀峰
            </small>
          </div>
        </FullBlock>
        <FullBlock className="block block__search" id="search">
          <div className="half block__search__text">
            <strong>言葉の連想を利用した検索ソリューション</strong>
            <h2>無難なものを作りたくなかった。</h2>
            <p>
              検索ワードから連想した言葉と検索結果とグラフィカルに表した
              前衛的なUIは、お客様にも大好評でした。
            </p>
            <p>
              実用性はこれからですが、展示会での出展様子がITmediaの記事になり、PR効果をもたらしました。
            </p>
            <div className="meta">
              <h3>開発期間・規模</h3>
              <ul>
                <li>2015年中期2.5ヶ月(1〜3人)</li>
              </ul>
              <h3>担当範囲</h3>
              <ul>
                <li>機能提案</li>
                <li>プロジェクトリーダー</li>
                <li>バックエンド</li>
                <li>フロントエンド</li>
              </ul>
              <h3>使用技術</h3>
              <ul>
                <li>MongoDB</li>
                <li>Express</li>
                <li>Angular</li>
                <li>Node.js</li>
                <li>Apache ManifoldCF</li>
                <li>Mecab</li>
              </ul>
            </div>
          </div>
          <div className="half block__search__image">
            <img className="display" src="/images/display2.png" />
            <img className="anime" src="/images/search.gif" />
          </div>
        </FullBlock>
        <FullBlock className="block block__fullstack" id="fullstack">
          <div className="half block__fullstack__text">
            <strong>スマホで打刻できる勤怠管理システム</strong>
            <h2>アプリ開発・インフラ構築まで幅広く。</h2>
            <p>
              インフラ構築・Web画面＆API開発・アプリ開発、ほぼ全ての作業を一人で、スピード感をもって行う経験ができました。
            </p>
            <p>
              今までExcel管理だった自社内の勤怠入力＆集計をシステム化。
              今後は外部へのサービス提供も視野に入れているそうです。
            </p>
            <div className="meta">
              <h3>開発期間・規模</h3>
              <ul>
                <li>開発2013年1〜2月(1人)</li>
                <li>保守2013年3月以降(1〜2人)</li>
              </ul>
              <h3>担当範囲</h3>
              <ul>
                <li>プロジェクトリーダー</li>
                <li>インフラ構築</li>
                <li>アプリ開発</li>
                <li>Web画面＆API開発</li>
                <li>保守</li>
              </ul>
              <h3>使用技術</h3>
              <ul>
                <li>Titanium Mobile CLI</li>
                <li>Ruby on Rails</li>
                <li>Apache Passenger</li>
                <li>MySQL</li>
                <li>DeployGate</li>
              </ul>
            </div>
          </div>
          <div className="half block__fullstack__image">
            <img src="/images/app.png" />
          </div>
        </FullBlock>
        <FullBlock className="block block__automation" id="automation">
          <div className="half block__automation__text">
            <strong>インフラ環境構築の自動化</strong>
            <h2>自動化は漢のロマン。</h2>
            <p>
              開発環境構築の自動化や、CI環境構築を行っていました。
              プルリクエストされたブランチを自動ビルドして、
              テスト結果をコメントしてくれる仕組みの構築など。
            </p>
            <p>
              新規参入メンバーの環境構築の時間短縮、
              作業用MacのSSDが飛んだ時のリカバリーに重宝しました。
            </p>
            <div className="meta">
              <h3>開発期間・規模</h3>
              <ul>
                <li>2014年初期以降(1人)</li>
              </ul>
              <h3>使用技術</h3>
              <ul>
                <li>Docker</li>
                <li>Chef</li>
                <li>Ansible</li>
                <li>Vagrant</li>
                <li>Jenkins</li>
                <li>GitLab</li>
              </ul>
            </div>
          </div>
          <div className="half block__automation__image">
            <img src="/images/automation.png" />
          </div>
        </FullBlock>
        <FullBlock className="block block__skillcloud" id="skillcloud">
          <div className="half block__skillcloud__text">
            <strong>フロントエンドのデモンストレーション</strong>
            <h2>スキルクラウド</h2>
            <p>
              関わった技術の経験/興味の度合いを視覚的に表現したデモです。
            </p>
            <p>
              1280x768ほどの解像度に最適化されています。
              スマートフォンまたはタッチ端末では正常に動作しない可能性があります。
            </p>
            <div className="meta">
              <h3>開発期間・規模</h3>
              <ul>
                <li>2015年後期1.5ヶ月以降(1人)</li>
              </ul>
              <h3>使用技術</h3>
              <ul>
                <li>React</li>
                <li>Redux</li>
                <li>D3.js</li>
                <li>webpack</li>
                <li>Karma</li>
              </ul>
            </div>
            <CloudLink text="デモを起動する" />
          </div>
          <div className="half block__skillcloud__image">
            <i className="fa fa-line-chart" />
            <i className="fa fa-bar-chart" />
          </div>
        </FullBlock>
      </div>
    )
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.selectSkill(null)
      setTimeout(resolve, 1500)
    }).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transform: "scale(1.75)",
        transition: "0.5s ease-out",
        opacity: 0.5,
      })
      setTimeout(resolve, 500)
    })).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transform: "scale(5)",
        transition: "0.3s",
        opacity: 0,
      })
      setTimeout(resolve, 300)
    })).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        display: 'none',
      })
    }))
  }

  componentWillUnmount() {
    this.props.selectSkill(SkillConst.initialSkill)
  }

  private get selectedNode(): SkillNode {
    const {selected} = this.props
    return SkillConst.rootCloud.findNodeBySkill(selected)
  }
}
