namespace test {

    let p_god;
    const C_DOC = "";

    /**
     * 抽象类A
     * @internal
     * */
    abstract class ForTestA {
        m_name:string;
        abstract toString():string;
    }

    class TestB extends ForTestA {

        toString():string {
            return this.m_name;
        }
    }

}